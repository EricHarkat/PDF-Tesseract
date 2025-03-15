const express = require("express");
const multer = require("multer");
const { uploadFile, getHistory } = require("../controllers/ocrController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadFile);
router.get("/history", getHistory);

module.exports = router;
