import requests
from app.core.config import settings

IBM_WATSON_URL = "https://eu-de.ml.cloud.ibm.com/ml/v1/text/chat?version=2023-05-29"
IBM_IAM_URL = "https://iam.cloud.ibm.com/identity/token"

def get_ibm_iam_token():
    data = {
        "apikey": settings.IBM_WATSON_API_KEY,
        "grant_type": "urn:ibm:params:oauth:grant-type:apikey"
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    response = requests.post(IBM_IAM_URL, data=data, headers=headers)
    response.raise_for_status()
    return response.json()["access_token"]

def call_ibm_watson_api(prompt: str) -> str:
    bearer_token = get_ibm_iam_token()
    body = {
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are SahyogBot, a helpful and polite AI assistant designed to guide Indian citizens—especially students, women, and rural families—through government schemes, scholarships, and financial aid.\n\n"
                    "Use the provided 'Context' and 'User Profile' to answer any scheme-related question.\n"
                    "Format strictly using GitHub Markdown (bold, bullet points, etc.)\n"
                    "ALWAYS include:\n"
                    "### Scheme Name\n"
                    "**Eligibility:** ...\n"
                    "**Benefits:** ...\n"
                    "**Apply Link:** ...\n"
                    "NEVER make up schemes. Be factual. Never hallucinate or suggest fake links.\n"
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "project_id": settings.IBM_PROJECT_ID,
        "model_id": settings.IBM_MODEL_ID,
        "frequency_penalty": 0,
        "max_tokens": 2000,
        "presence_penalty": 0,
        "temperature": 0,
        "top_p": 1
    }
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {bearer_token}"
    }
    response = requests.post(IBM_WATSON_URL, headers=headers, json=body)
    if response.status_code != 200:
        raise Exception(f"IBM Watson API error: {response.text}")
    data = response.json()
    try:
        return data["results"][0]["generated_text"]
    except Exception:
        return str(data) 