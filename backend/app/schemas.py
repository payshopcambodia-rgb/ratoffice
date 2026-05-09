from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, Field


Currency = Literal["KHR", "USD"]
PaymentStatus = Literal["PENDING", "PAID", "EXPIRED", "FAILED"]


class CreateKhqrRequest(BaseModel):
    amount: Decimal = Field(gt=0, le=10000000, decimal_places=2)
    currency: Currency = "KHR"


class CreateKhqrResponse(BaseModel):
    payment_id: str
    md5: str
    qr_string: str
    qr_image: str
    amount: Decimal
    currency: Currency
    status: PaymentStatus
    merchant_account: str
    merchant_name: str
    expires_at: str
    message: str


class PaymentStatusResponse(BaseModel):
    payment_id: str
    md5: str
    status: PaymentStatus
    amount: Decimal
    currency: Currency
    expires_at: str
    message: str
