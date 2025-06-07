import os
from dotenv import load_dotenv
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

DOCS_PATH = "docs"
VECTOR_STORE_PATH = "vector_store"
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200

# Singleton for vector store
_vector_store = None

def load_or_create_vector_store():
    global _vector_store
    if _vector_store is not None:
        return _vector_store
    if not os.path.exists(VECTOR_STORE_PATH):
        os.makedirs(VECTOR_STORE_PATH)
    loaders = []
    for filename in os.listdir(DOCS_PATH):
        if filename.lower().endswith(".pdf"):
            loaders.append(PyPDFLoader(os.path.join(DOCS_PATH, filename)))
    documents = []
    for loader in loaders:
        documents.extend(loader.load())
    splitter = RecursiveCharacterTextSplitter(chunk_size=CHUNK_SIZE, chunk_overlap=CHUNK_OVERLAP)
    docs = splitter.split_documents(documents)
    embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
    vector_store = Chroma.from_documents(docs, embeddings, persist_directory=VECTOR_STORE_PATH)
    vector_store.persist()
    _vector_store = vector_store
    return vector_store

def get_scheme_recommendation(query: str) -> str:
    vector_store = load_or_create_vector_store()
    retriever = vector_store.as_retriever()
    llm = OpenAI(openai_api_key=OPENAI_API_KEY, temperature=0)
    qa = RetrievalQA.from_chain_type(llm=llm, retriever=retriever, return_source_documents=False)
    result = qa({"query": query})
    return result["result"] 