import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

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
      const response = await axios.post("http://localhost:5000/api/upload", formData);
      setText(response.data.text);
      fetchHistory(); // Met à jour l'historique après upload
    } catch (error) {
      console.error("Erreur OCR :", error);
    }
    setLoading(false);
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/history");
      setHistory(response.data);
    } catch (error) {
      console.error("Erreur de récupération de l'historique :", error);
    }
  };

  const deleteHistoryItem = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/api/history/${id}`);
        console.log(`document supprimé:${id}`)
        setHistory(history.filter(item => item._id !== id)); // Mettre à jour la liste après suppression
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
    }
};

const clearHistory = async () => {
  try {
      await axios.delete("http://localhost:5000/api/history");
      setHistory([]); // Vide l'historique côté client
      console.log("Histroique vidé")
  } catch (error) {
      console.error("Erreur lors de la suppression complète :", error);
  }
};

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          OCR avec Tesseract
        </h2>

        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mb-4"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                ></path>
              </svg>
              Analyse en cours...
            </>
          ) : (
            "Analyser"
          )}
        </button>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Texte extrait :</h3>
          <pre className="bg-gray-200 p-4 rounded text-gray-900 mt-2 max-h-60 overflow-auto">
            {text || "Aucun texte extrait pour l'instant."}
          </pre>
        </div>

        {/* Bouton pour afficher l'historique */}
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="mt-4 w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          {showHistory ? "Masquer l'historique" : "Afficher l'historique"}
        </button>
        {/* Bouton "Vider l’historique" */}
        {history.length > 0 && (
            <button
                onClick={clearHistory}
                className="mt-3 bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-300 w-full"
            >
                🗑 Vider l’historique
            </button>
        )}

        {/* Historique des fichiers analysés */}
        {showHistory && (
          <div className="mt-4 bg-gray-100 p-4 rounded shadow-inner max-h-60 overflow-auto">
            <h3 className="text-lg font-semibold text-gray-700">Historique des analyses :</h3>
            {history.length > 0 ? (
              history.map((item) => (
                <div key={item._id} className="border-b border-gray-300 py-2">
                  <div>
                    <p className="text-sm font-bold text-blue-600">{item.filename}</p>
                    <p className="text-xs text-gray-600">{new Date(item.date).toLocaleString()}</p>
                    <pre className="text-xs text-gray-800 bg-white p-2 rounded mt-1">{item.text}</pre>
                  </div>
                  <button
                        onClick={() => deleteHistoryItem(item._id)}
                        className="ml-4 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-3 rounded transition duration-300"
                    >
                        🗑 Supprimer
                    </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Aucun historique pour l'instant.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
