from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import query
from app.core.config import settings

app = FastAPI()
app.include_router(query.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
) 