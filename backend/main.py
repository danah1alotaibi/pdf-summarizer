from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import fitz  # PyMuPDF

app = FastAPI()

# السماح للفرونت إند بالاتصال بالباك إند
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "PDF Summarizer API is running"}

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    # قراءة الملف
    pdf_bytes = await file.read()

    # فتح PDF
    pdf = fitz.open(stream=pdf_bytes, filetype="pdf")

    # استخراج النص
    text = ""

    for page in pdf:
        text += page.get_text()

    # تلخيص بسيط (أول 200 كلمة)
    words = text.split()
    summary = " ".join(words[:200])

    return {
        "filename": file.filename,
        "pages": len(pdf),
        "summary": summary
    }