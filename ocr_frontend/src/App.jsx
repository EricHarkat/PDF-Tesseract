import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Veuillez sélectionner un fichier !");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/upload", formData);
      setText(response.data.text);
    } catch (error) {
      console.error("Erreur OCR :", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">OCR avec Tesseract</h2>
        
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mb-4"
        />

        <button 
          onClick={handleUpload} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          {loading ? "Analyse en cours..." : "Analyser"}
        </button>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Texte extrait :</h3>
          <pre className="bg-gray-200 p-4 rounded text-gray-900 mt-2 max-h-60 overflow-auto">
            {text || "Aucun texte extrait pour l'instant."}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
