from fpdf import FPDF

def generate_scheme_pdf(scheme_data, filename="scheme.pdf"):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="Top Government Scheme Recommendation", ln=True, align='C')
    pdf.ln(10)
    for key, value in scheme_data.items():
        pdf.multi_cell(0, 10, f"{key}: {value}")
    pdf.output(filename)
    return filename 