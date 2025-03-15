const mongoose = require("mongoose");

const OcrResultSchema = new mongoose.Schema({
    filename: String,
    text: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("OcrResult", OcrResultSchema);
