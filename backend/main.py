from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_agent import get_scheme_recommendation
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

class QueryRequest(BaseModel):
    query: str

@app.post("/query")
def query_endpoint(request: QueryRequest):
    try:
        answer = get_scheme_recommendation(request.query)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 