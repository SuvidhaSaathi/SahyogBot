SahyogBot Backend
A FastAPI backend that uses LangChain and currently OpenAI to provide government scheme recommendations based on PDF documents.
Features
FastAPI server with a single /query POST endpoint.
Retrieval-Augmented Generation (RAG) pipeline using LangChain.
PDF ingestion: Place government scheme PDFs in the docs/ folder.
Document chunking and OpenAI embeddings.
ChromaDB for local vector storage (vector_store/).
Environment variable support for API keys via .env.
Production-safe and modular code.
Project Structure
Apply to .gitignore
Setup Instructions
Clone the repository and navigate to the backend directory:
Apply to .gitignore
Install dependencies:
Apply to .gitignore
Add your OpenAI API key to a .env file:
Apply to .gitignore
Add your government scheme PDFs to the docs/ folder.
Run the FastAPI server:
Apply to .gitignore
API Usage
POST /query
Request Body:
Apply to .gitignore
Response:
Apply to .gitignore
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
The .env file is required for your OpenAI API key.
.gitignore ensures sensitive and unnecessary files are not committed.