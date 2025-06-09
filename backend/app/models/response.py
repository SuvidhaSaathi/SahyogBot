from pydantic import BaseModel
 
class QueryResponse(BaseModel):
    answer: str
    pdf_url: str = None 