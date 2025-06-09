from app.core.vectorstore import get_context
from app.core.ibm import call_ibm_watson_api
from app.utils.logger import log_request
from app.utils.cache import cached_scheme_response
from app.services.pdfgen import generate_scheme_pdf

import re

def parse_scheme_from_markdown(markdown: str):
    scheme = {}
    name = re.search(r"### (.+)", markdown)
    eligibility = re.search(r"\*\*Eligibility:\*\*\s*(.+)", markdown)
    benefits = re.search(r"\*\*Benefits:\*\*\s*(.+)", markdown)
    link = re.search(r"\*\*Apply Link:\*\*\s*(.+)", markdown)
    if name: scheme["Scheme Name"] = name.group(1)
    if eligibility: scheme["Eligibility"] = eligibility.group(1)
    if benefits: scheme["Benefits"] = benefits.group(1)
    if link: scheme["Apply Link"] = link.group(1)
    return scheme

async def get_scheme_recommendation(request):
    profile = f"Age: {request.age}, State: {request.state}, District: {request.district}, Gender: {request.gender}, Family Income: {request.family_income}"
    context = get_context(request.query)
    prompt = f"User Profile: {profile}\n\nContext:\n{context}\n\nQuestion: {request.query}\n\nAnswer:"
    answer = cached_scheme_response(prompt)
    log_request(profile, request.query, answer)
    scheme_data = parse_scheme_from_markdown(answer)
    pdf_path = generate_scheme_pdf(scheme_data)
    return {"answer": answer, "pdf_url": pdf_path} 