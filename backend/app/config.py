from functools import lru_cache

from pydantic import Field, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    bakong_token: SecretStr = Field(alias="BAKONG_TOKEN")
    backend_secret_key: SecretStr = Field(alias="BACKEND_SECRET_KEY")
    merchant_account: str = Field(default="chheak_narat@bkrt", alias="MERCHANT_ACCOUNT")
    merchant_name: str = Field(default="NARAT CHHEAK", alias="MERCHANT_NAME")
    merchant_city: str = Field(default="Phnom Penh", alias="MERCHANT_CITY")
    merchant_phone: str = Field(default="", alias="MERCHANT_PHONE")
    cors_origins: str = Field(default="http://localhost:5173,http://localhost:5174", alias="CORS_ORIGINS")
    qr_expires_seconds: int = Field(default=180, alias="QR_EXPIRES_SECONDS", ge=30, le=900)

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def allowed_origins(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
