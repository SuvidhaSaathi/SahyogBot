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

## Deployment Note

**To avoid memory issues on low-memory hosts (like Render free tier), always run Uvicorn with a single worker:**

```
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 1
```

If using Gunicorn, set `--workers 1` as well.

## API Usage
POST `/query` with JSON:
```