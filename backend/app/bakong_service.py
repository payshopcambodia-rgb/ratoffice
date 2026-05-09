import base64
import hashlib
import hmac
import json
import secrets
from datetime import UTC, datetime, timedelta
from decimal import Decimal
from io import BytesIO

import qrcode
from bakong_khqr import KHQR
from fastapi import HTTPException, status

from app.config import Settings


def _b64url_encode(value: bytes) -> str:
    return base64.urlsafe_b64encode(value).rstrip(b"=").decode("ascii")


def _b64url_decode(value: str) -> bytes:
    padding = "=" * (-len(value) % 4)
    return base64.urlsafe_b64decode(value + padding)


def _json_default(value):
    if isinstance(value, Decimal):
        return str(value)
    raise TypeError(f"Unsupported JSON value: {type(value)!r}")


def _sign(payload: str, secret: str) -> str:
    digest = hmac.new(secret.encode("utf-8"), payload.encode("utf-8"), hashlib.sha256).digest()
    return _b64url_encode(digest)


def _create_payment_id(payload: dict, secret: str) -> str:
    encoded_payload = _b64url_encode(
        json.dumps(payload, separators=(",", ":"), default=_json_default).encode("utf-8")
    )
    signature = _sign(encoded_payload, secret)
    return f"{encoded_payload}.{signature}"


def _read_payment_id(payment_id: str, secret: str) -> dict:
    try:
        encoded_payload, signature = payment_id.split(".", 1)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid payment id.") from exc

    expected = _sign(encoded_payload, secret)

    if not hmac.compare_digest(signature, expected):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid payment signature.")

    try:
        return json.loads(_b64url_decode(encoded_payload))
    except (json.JSONDecodeError, ValueError) as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid payment payload.") from exc


def _qr_image_data_uri(qr_string: str) -> str:
    image = qrcode.make(qr_string)
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    encoded = base64.b64encode(buffer.getvalue()).decode("ascii")
    return f"data:image/png;base64,{encoded}"


def _normalize_amount(amount: Decimal, currency: str) -> Decimal | int | float:
    if currency == "KHR":
        return int(amount)
    return float(amount)


def _normalize_status(raw_status) -> str:
    value = str(raw_status or "").upper()

    if value in {"PAID", "SUCCESS", "SUCCESSFUL"}:
        return "PAID"

    if value in {"UNPAID", "PENDING", "NOT_FOUND", "NOT PAID"}:
        return "PENDING"

    if value == "EXPIRED":
        return "EXPIRED"

    return "FAILED"


class BakongPaymentService:
    def __init__(self, settings: Settings):
        self.settings = settings
        self.khqr = KHQR(settings.bakong_token.get_secret_value())
        self.secret = settings.backend_secret_key.get_secret_value()

    def create_payment(self, amount: Decimal, currency: str) -> dict:
        now = datetime.now(UTC)
        expires_at = now + timedelta(seconds=self.settings.qr_expires_seconds)
        bill_number = f"SUP-{now.strftime('%Y%m%d%H%M%S')}-{secrets.token_hex(3).upper()}"

        try:
            qr_string = self.khqr.create_qr(
                bank_account=self.settings.merchant_account,
                merchant_name=self.settings.merchant_name,
                merchant_city=self.settings.merchant_city,
                amount=_normalize_amount(amount, currency),
                currency=currency,
                store_label="Portfolio Support",
                bill_number=bill_number,
                terminal_label="Website",
                static=False,
                expiration=self.settings.qr_expires_seconds / 86400,
            )
            md5 = self.khqr.generate_md5(qr_string)
        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="Failed to create Bakong KHQR.",
            ) from exc

        payload = {
            "md5": md5,
            "amount": str(amount),
            "currency": currency,
            "bill_number": bill_number,
            "expires_at": expires_at.isoformat(),
        }
        payment_id = _create_payment_id(payload, self.secret)

        return {
            "payment_id": payment_id,
            "md5": md5,
            "qr_string": qr_string,
            "qr_image": _qr_image_data_uri(qr_string),
            "amount": amount,
            "currency": currency,
            "status": "PENDING",
            "merchant_account": self.settings.merchant_account,
            "merchant_name": self.settings.merchant_name,
            "expires_at": expires_at.isoformat(),
            "message": "KHQR generated. Waiting for payment.",
        }

    def check_status(self, payment_id: str) -> dict:
        payload = _read_payment_id(payment_id, self.secret)
        expires_at = datetime.fromisoformat(payload["expires_at"])
        amount = Decimal(payload["amount"])

        if datetime.now(UTC) >= expires_at:
            return {
                "payment_id": payment_id,
                "md5": payload["md5"],
                "status": "EXPIRED",
                "amount": amount,
                "currency": payload["currency"],
                "expires_at": payload["expires_at"],
                "message": "This KHQR has expired.",
            }

        try:
            raw_status = self.khqr.check_payment(payload["md5"])
            payment_status = _normalize_status(raw_status)
        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="Failed to check Bakong payment status.",
            ) from exc

        messages = {
            "PENDING": "Payment is still pending.",
            "PAID": "Payment received. Thank you for the support.",
            "EXPIRED": "This KHQR has expired.",
            "FAILED": "Payment status check returned an unexpected result.",
        }

        return {
            "payment_id": payment_id,
            "md5": payload["md5"],
            "status": payment_status,
            "amount": amount,
            "currency": payload["currency"],
            "expires_at": payload["expires_at"],
            "message": messages[payment_status],
        }
