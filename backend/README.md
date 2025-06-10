# SahyogBot Backend

A modular FastAPI backend for government scheme recommendations using LangChain, IBM watsonx.ai, and ChromaDB.

## Features
- Modular FastAPI app (core, routes, services, models, utils)
- Onboarding: collects age, state, district, gender, family income
- Profile-driven prompts for better recommendations
- PDF output for top scheme
- Markdown+HTML+PDF formatting
- Request logging
- CORS restriction
- Caching for repeated queries

## Project Structure
```
backend/
  app/
    __init__.py
    main.py
    core/
      config.py
      ibm.py
      vectorstore.py
    routes/
      query.py
    services/
      scheme.py
      pdfgen.py
    models/
      request.py
      response.py
    utils/
      logger.py
      cache.py
  docs/
  vector_store/
  logs.txt
  requirements.txt
  .env
```

## Setup
1. `pip install -r requirements.txt`
2. Add your IBM credentials to `.env`
3. Place scheme PDFs in `docs/`
4. `uvicorn app.main:app --reload`

### API Usage
Endpoint: POST /query

- Sample request body:

```json
{
  "query": "What schemes for girls in UP?",
  "age": 18,
  "state": "Uttar Pradesh",
  "district": "Lucknow",
  "gender": "female",
  "family_income": 200000
}
```
- Sample response:

```json
{
  "answer": "...markdown-formatted answer...",
  "pdf_url": "/static/scheme.pdf"
}
```
### How It Works
- main.py initializes the FastAPI app and defines the /query endpoint.
- PDFs from the docs/ folder are loaded and split into chunks.
- LangChain generates vector embeddings and stores them in ChromaDB.
- RetrievalQA fetches relevant chunks and generates an LLM-based answer.
- The final answer is formatted in Markdown and converted to a PDF.


### Notes
- The docs/ folder must contain at least one scheme PDF file.
- Vector index is auto-generated in vector_store/.
- A valid .env file is required to access IBM watsonx.ai API.
- Sensitive data is protected via .gitignore.
