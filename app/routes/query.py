from fastapi import APIRouter
from app.models.request import QueryRequest
from app.services.scheme import get_scheme_recommendation

router = APIRouter()

@router.post("/query")
async def query_endpoint(request: QueryRequest):
    return await get_scheme_recommendation(request) 