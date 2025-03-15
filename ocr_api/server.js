require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ocrRoutes = require("./routes/ocrRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connecté à MongoDB"))
    .catch((err) => console.error("Erreur de connexion MongoDB :", err));

// Routes
app.use("/api", ocrRoutes);

app.listen(5000, () => {
    console.log("✅ API Node.js en écoute sur http://localhost:5000");
});
