from pydantic import BaseModel

class QueryRequest(BaseModel):
    query: str
    age: int = None
    state: str = None
    district: str = None
    gender: str = None
    family_income: float = None 