import os
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain.vectorstores import Chroma

DOCS_PATH = "docs"
VECTOR_STORE_PATH = "vector_store"
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200

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
    embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    vector_store = Chroma.from_documents(docs, embeddings, persist_directory=VECTOR_STORE_PATH)
    vector_store.persist()
    _vector_store = vector_store
    return vector_store

def get_context(query: str) -> str:
    vector_store = load_or_create_vector_store()
    retriever = vector_store.as_retriever()
    docs = retriever.get_relevant_documents(query)
    return "\n\n".join([doc.page_content for doc in docs]) 