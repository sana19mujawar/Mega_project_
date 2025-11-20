from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    # Gemini API Config
    GEMINI_API_KEY: str = "AIzaSyBWUNybKP25HOrUiNg6o4vR07Fh111fsNE"
    GEMINI_MODEL: str = "models/gemini-2.0-flash"
    
    # Email Config
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 465
    SENDER_EMAIL: str = "sanamujawar1902@gmail.com"
    SENDER_APP_PASSWORD: str = "zitwmwpbswjbuksa"
    
    # MongoDB
    MONGODB_URL: str = Field(default="mongodb+srv://sanamujawar1902:Sana2004@cluster-project.3zty3z8.mongodb.net/8")
    DATABASE_NAME: str = Field(default="HR_AGENT")
    MONGODB_CONNECT_TIMEOUT_MS: int = Field(default=20000)
    MONGODB_SERVER_SELECTION_TIMEOUT_MS: int = Field(default=20000)
    MONGODB_ALLOW_INVALID_CERTS: bool = Field(default=False)
    
    # JWT
    JWT_SECRET: str = "your-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # Model Paths
    MODEL_DIR: str = "models"
    
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore",
    )

settings = Settings()

