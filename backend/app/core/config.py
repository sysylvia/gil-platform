"""Application configuration using Pydantic Settings"""

from functools import lru_cache
from typing import List
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings"""

    # Application
    APP_NAME: str = "GIL Platform API"
    VERSION: str = "0.1.0"
    DEBUG: bool = True
    ENVIRONMENT: str = "development"

    # Database
    DATABASE_URL: str

    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]

    # IRT Engine Parameters
    IRT_MIN_ITEMS: int = 3
    IRT_MAX_ITEMS: int = 10
    IRT_TARGET_SE: float = 0.35
    IRT_INITIAL_THETA: float = 0.0

    # Peer Prediction (BTS)
    BTS_MIN_RESPONSES: int = 5
    BTS_WEIGHT_INFORMATION: float = 1.0
    BTS_WEIGHT_PREDICTION: float = 2.0
    BTS_WEIGHT_ACCURACY: float = 1.5
    BTS_WEIGHT_INSIGHT: float = 1.0

    # Redis (optional)
    REDIS_URL: str | None = None

    # Logging
    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "json"

    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()
