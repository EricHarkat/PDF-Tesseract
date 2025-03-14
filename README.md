# 📄 OCR Application

## 🚀 Description
Cette application permet de scanner un fichier PDF et d'en extraire le texte grâce à **Tesseract OCR**. Elle est composée de trois parties principales :

- **Backend (Node.js + Express.js)** : Gère l'upload des fichiers et communique avec le service OCR en Python.
- **Service OCR (Python + Flask + Tesseract OCR)** : Analyse les PDF et renvoie le texte extrait.
- **Frontend (React + Tailwind CSS + Vite)** : Interface utilisateur permettant d'uploader et de visualiser les résultats OCR.

---

## Choix Technique

J'ai créé le service OCR en Python, bien que j'aurais pu l'implémenter directement dans l'API Node.js. J'ai fait ce choix parce que Tesseract, lorsqu'il est utilisé avec Node.js, repose sur WebAssembly (WASM), ce qui le rend plus lent en raison des calculs intensifs qu'il nécessite. En revanche, Python, avec pytesseract, est plus rapide nativement. De plus, le prétraitement des images en Python bénéficie du support d'OpenCV et de PIL, tandis que sous Node.js, il faut utiliser jimp, qui est moins performant pour ce type de traitement.



## 🛠️ Technologies Utilisées

### 🌍 Backend
- **Node.js**
- **Express.js**
- **Multer** (pour l'upload des fichiers)
- **Axios** (pour la communication avec l'API OCR)

### 🔍 Service OCR
- **Python 3.x**
- **Flask**
- **Tesseract OCR**
- **pdf2image** (pour convertir les PDF en images)

### 🎨 Frontend
- **React.js**
- **Vite**
- **Tailwind CSS**
- **Axios** (pour communiquer avec l'API Node.js)

---

## 📥 Installation & Configuration

### 1️⃣ **Cloner le projet**
```bash
git clone https://github.com/ton-github/ocr_project.git
cd ocr_project
```

### 2️⃣ **Backend (Node.js)**
```bash
cd ocr_api
npm install
```
#### ➡️ **Démarrer le serveur Node.js**
```bash
node server.js  
```

### 3️⃣ **Service OCR (Python + Flask)**
```bash
cd ocr_service
pip install -r requirements.txt
```
#### ➡️ **Démarrer le service OCR**
```bash
python ocr_service.py
```
⚠️ **Assurez-vous que `tesseract-ocr` est bien installé sur votre système et accessible via PATH.**
- Lien officiel → https://github.com/UB-Mannheim/tesseract/wiki
- Par défaut → Tesseract s’installe dans : C:\Program Files\Tesseract-OCR
- Ajouter au PATH → C:\Program Files\Tesseract-OCR
- Redemarrez et testez :
```bash
tesseract -v
```

⚠️ **Assurez-vous que `poppler` est bien installé sur votre système et accessible via PATH.**
- Telecharger → https://github.com/oschwartz10612/poppler-windows/releases
- Extraire et copier le dossier poppler-xx/bin/ et place-le dans : C:\Program Files\poppler\
- Ajouter au PATH → Ajouter au PATH → C:\Program Files\Tesseract-OCR
- Redemarrez et testez :
```bash
pdfinfo -v
```

### 4️⃣ **Frontend (React + Vite)**
```bash
cd ocr_frontend
npm install
```
#### ➡️ **Lancer l'application React**
```bash
npm run dev
```
L'interface sera accessible sur `http://localhost:5173`

---

## 📷 Exemple d'Utilisation
1. Uploadez un fichier PDF via l'interface React.
2. Le fichier est envoyé à l'API Node.js, qui le transfère au service OCR en Python.
3. Le service OCR extrait le texte et renvoie les résultats.
4. Le texte est affiché sur l'interface utilisateur.

---

## 🚀 Améliorations Futures
- Ajouter la prise en charge des images (JPG, PNG, TIFF)
- Optimisation du modèle OCR pour une meilleure reconnaissance des textes complexes
- Ajout d'une base de données pour sauvegarder les résultats OCR
- Implémentation d'une gestion des utilisateurs avec authentification

---

## 💡 Contributeurs
👤 **Eric Harkat**

Si vous souhaitez contribuer, n'hésitez pas à **forker** le projet et à proposer des améliorations via **pull request**. 😃

