"""FastAPI application entry point"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings

settings = get_settings()

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    description="Global Intelligence Layer - Clinical AI Validation Platform",
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "name": settings.APP_NAME,
        "version": settings.VERSION,
        "status": "running",
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


# TODO: Add API routers
# from app.api.routes import auth, users, assessments, cases, analytics, community
# app.include_router(auth.router, prefix="/auth", tags=["authentication"])
# app.include_router(users.router, prefix="/users", tags=["users"])
# app.include_router(assessments.router, prefix="/assessments", tags=["assessments"])
# app.include_router(cases.router, prefix="/cases", tags=["cases"])
# app.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
# app.include_router(community.router, prefix="/community", tags=["community"])
