const express = require("express");
const multer = require("multer");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const FormData = require("form-data");

const app = express();
app.use(cors());  // Autorise les requêtes depuis le frontend

const upload = multer({ dest: "uploads/" }); // Dossier temporaire

app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "Aucun fichier envoyé." });
        }

        // Lire le fichier depuis le disque
        const formData = new FormData();
        formData.append("file", fs.createReadStream(file.path), file.originalname);

        // Envoyer le fichier à l'API Python (OCR)
        const response = await axios.post("http://127.0.0.1:5001/ocr", formData, {
            headers: { ...formData.getHeaders() },
        });

        // Supprimer le fichier après envoi
        fs.unlinkSync(file.path);

        res.json({ text: response.data.text });
    } catch (error) {
        console.error("Erreur OCR :", error);
        res.status(500).json({ error: "Erreur de traitement OCR" });
    }
});

app.listen(5000, () => {
    console.log("✅ API Node.js en écoute sur http://localhost:5000");
});
