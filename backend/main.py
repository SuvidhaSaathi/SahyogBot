from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import requests

# Load environment variables
load_dotenv()

IBM_API_KEY = os.getenv("IBM_API_KEY")
IBM_DEPLOYMENT_URL = os.getenv("IBM_DEPLOYMENT_URL")

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev; restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Models ---
class QueryRequest(BaseModel):
    query: str

class ChatbotRequest(BaseModel):
    content: str
    role: str


# --- IBM Token Handler ---
def get_ibm_token(api_key: str) -> str:
    print("Requesting token with API key:", api_key[:8] + "...")
    response = requests.post(
        "https://iam.cloud.ibm.com/identity/token",
        data={
            "apikey": api_key,
            "grant_type": "urn:ibm:params:oauth:grant-type:apikey"
        },
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    print("Token status code:", response.status_code)
    print("Token response text:", response.text)
    ...
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to get IBM token")  
    token = response.json().get("access_token")
    if not token:
        raise HTTPException(status_code=500, detail="No access token received")
    print("Token received successfully")
    return token




# --- LangChain Agent Stub (mock for now) ---
def get_scheme_recommendation(query: str) -> str:
    # Replace this with your actual LangChain agent logic
    return f"🎯 Relevant Government Schemes:\n• PM-Kisan – ₹6000/year support for small farmers\n📋 Next Steps:\n1. Check eligibility\n🔗 Official Links:\n- https://pmkisan.gov.in/"


# --- Endpoints ---

@app.post("/query")
def query_endpoint(request: QueryRequest):
    try:
        answer = get_scheme_recommendation(request.query)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/chatbot")
def chatbot_endpoint(request: ChatbotRequest):
    try:
        token = get_ibm_token(IBM_API_KEY)
        payload = {
            "messages": [
                {
                    "content": request.content,
                    "role": request.role
                }
            ]
        }
        response = requests.post(
            IBM_DEPLOYMENT_URL,
            json=payload,
            headers={"Authorization": f"Bearer {token}"}
        )

        if response.status_code != 200:
            print("Model error:", response.text)
            raise HTTPException(status_code=500, detail="LLM call failed")

        result = response.json()
        return {"generated_text": result.get("generated_text", "No response from model")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
