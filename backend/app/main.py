import os

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.bakong_service import BakongPaymentService
from app.config import Settings, get_settings
from app.schemas import CreateKhqrRequest, CreateKhqrResponse, PaymentStatusResponse


def get_payment_service(settings: Settings = Depends(get_settings)) -> BakongPaymentService:
    return BakongPaymentService(settings)


app = FastAPI(
    title="Portfolio Bakong KHQR API",
    version="1.0.0",
    description="Secure backend API for creating Bakong KHQR support payments.",
)

cors_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:5174").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/khqr/create", response_model=CreateKhqrResponse)
def create_khqr(
    payload: CreateKhqrRequest,
    payment_service: BakongPaymentService = Depends(get_payment_service),
):
    return payment_service.create_payment(payload.amount, payload.currency)


@app.get("/api/khqr/status/{payment_id}", response_model=PaymentStatusResponse)
def check_khqr_status(
    payment_id: str,
    payment_service: BakongPaymentService = Depends(get_payment_service),
):
    return payment_service.check_status(payment_id)
