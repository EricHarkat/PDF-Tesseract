const express = require("express");
const multer = require("multer");
const { uploadFile, getHistory, deleteHistory,deleteAllHistory  } = require("../controllers/ocrController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadFile);
router.get("/history", getHistory);
router.delete("/history", deleteAllHistory);
router.delete("/history/:id", deleteHistory);


module.exports = router;
