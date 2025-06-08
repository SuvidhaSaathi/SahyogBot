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

## API Usage
POST `/query` with JSON:
```
{
  "query": "What schemes for girls in UP?",
  "age": 18,
  "state": "Uttar Pradesh",
  "district": "Lucknow",
  "gender": "female",
  "family_income": 200000
}
```

Response:
```
{
  "answer": "...markdown...",
  "pdf_url": "/static/scheme.pdf"
}
```

How it Works
main.py:
Defines the FastAPI app and /query endpoint. Receives a user query and calls the LangChain pipeline.
langchain_agent.py:
Loads all PDFs from docs/.
Splits documents into chunks.
Embeds chunks using OpenAI embeddings.
Stores/loads vectors in ChromaDB (vector_store/).
Uses RetrievalQA to answer queries based on the most relevant document chunks.
requirements.txt:
Lists all required Python packages, including FastAPI, LangChain, OpenAI, ChromaDB, and PDF support.
Notes
The backend will not work if the docs/ folder is empty. Add at least one PDF.
The vector index is automatically created and persisted in vector_store/.
The .env file is required for your Watson API key.
.gitignore ensures sensitive and unnecessary files are not committed.