from typing import Literal
from pydantic_settings import BaseSettings , SettingsConfigDict

class Settings(BaseSettings):
    NODE_ENV: Literal["development", "production", "test"] = "development"
    PROJECT_NAME:str="MedNear API"
    PORT: int=8000

    DATABASE_URL: str = "postgresql+asyncpg://mednear:mednear_password@localhost:5432/mednear_db"

    REDIS_URL:str ="redis://localhost:6379/0"

    JWT_ACCESS_SECRET:str = "mednear_dev_access_secret_key_12345"
    JWT_REFRESH_SECRET: str = "mednear_dev_refresh_secret_key_12345"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    model_config=SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings=Settings()