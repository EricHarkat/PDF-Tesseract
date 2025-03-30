const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const OcrResult = require("../models/OcrResult");

const uploadFile = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "Aucun fichier envoyé." });
        }

        const formData = new FormData();
        formData.append("file", fs.createReadStream(file.path), file.originalname);

        const response = await axios.post("http://127.0.0.1:5001/ocr", formData, {
            headers: { ...formData.getHeaders() },
        });

        fs.unlinkSync(file.path); // Supprimer le fichier temporaire après traitement

        // Sauvegarde du texte extrait dans MongoDB
        const newResult = new OcrResult({
            filename: file.originalname,
            text: response.data.text
        });
        await newResult.save();

        res.json({ text: response.data.text, message: "Texte sauvegardé en base de données." });
    } catch (error) {
        console.error("Erreur OCR :", error);
        res.status(500).json({ error: "Erreur de traitement OCR" });
    }
};

const getHistory = async (req, res) => {
    try {
        const history = await OcrResult.find().sort({ date: -1 });
        res.json(history);
    } catch (error) {
        console.error("Erreur récupération historique :", error);
        res.status(500).json({ error: "Impossible de récupérer l'historique" });
    }
};

const deleteHistory = async (req, res) => {
    try {
        const {id} = req.params;
        await OcrResult.findByIdAndDelete(id)
        res.json({ message: "Entrée supprimée avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        res.status(500).json({ error: "Impossible de supprimer l'entrée" });
    }
}

const deleteAllHistory = async (req, res) => {
    try {
        await OcrResult.deleteMany({});
        res.json({ message: "Historique supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression complète :", error);
        res.status(500).json({ error: "Impossible de supprimer l'historique" });
    }
}

module.exports = { uploadFile, getHistory, deleteHistory, deleteAllHistory };
