from app.core.database import Base, engine
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
import app.models

from app.core.config import settings
from app.api.v1.auth import router as auth_router
from app.api.v1.medicines import router as medicines_router
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info(f"🚀 Starting {settings.PROJECT_NAME} in [{settings.NODE_ENV}] mode...")
  
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("✅ Database tables verified and created successfully!")
    yield
    logger.info("🛑 Gracefully shutting down MedNear API and releasing resources...")
    await engine.dispose()
app=FastAPI(
    title=settings.PROJECT_NAME,
    description="Production-ready REST API for medicine search, nearby stock lookup, and 30-min reservations",
    version="1.0.0",
    docs_url="/docs",      
    redoc_url="/redoc",    
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status":"ok",
        "service":settings.PROJECT_NAME,
        "enment":settings.NODE_ENV
    }

app.include_router(auth_router, prefix="/api/v1")
app.include_router(medicines_router, prefix="/api/v1")
