from flask import Flask, request, jsonify
import pytesseract
from pdf2image import convert_from_path
from PIL import Image
import os

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/ocr", methods=["POST"])
def ocr():
    file = request.files["file"]
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    extracted_text = ""

    if file.filename.endswith(".pdf"):
        # Convertir le PDF en images
        images = convert_from_path(file_path)
        for image in images:
            extracted_text += pytesseract.image_to_string(image, lang="fra") + "\n"
    else:
        # Lire l'image et appliquer OCR
        image = Image.open(file_path)
        extracted_text = pytesseract.image_to_string(image, lang="fra")

    return jsonify({"text": extracted_text})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True) # 0.0.0.0 Ecoute toutes les adresse ip disponibles sur la machines
