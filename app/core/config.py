from pydantic import BaseSettings

class Settings(BaseSettings):
    IBM_WATSON_API_KEY: str
    IBM_PROJECT_ID: str
    IBM_MODEL_ID: str
    ALLOWED_ORIGINS: list = ["http://localhost:8000", "http://localhost:5500"]

    class Config:
        env_file = ".env"

settings = Settings() 