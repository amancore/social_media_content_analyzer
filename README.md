# 📊 Social Media Content Analyzer

A full-stack web application that extracts text from images/PDFs, analyzes sentiment, and provides smart suggestions to improve social media content.

---

## 📌 Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Live Demo](#live-demo)
- [How It Works](#how-it-works)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Acknowledgments](#acknowledgments)
- [License](#license)

---

## 🧩 Introduction
This tool helps creators, marketers, and analysts understand the tone of their social media content. Upload an image or PDF, and the app extracts the text, performs sentiment analysis, and suggests improvements.

---

## 🚀 Features
- 📄 **Upload Files:** Supports PDF, PNG, JPG, JPEG  
- 🔍 **Text Extraction:** OCR for images + text parsing for PDFs  
- 😊 **Sentiment Analysis:** Positive, Negative, Neutral  
- 💡 **Smart Suggestions:** Offers better content ideas  
- 🖱️ **Drag & Drop Interface:** Smooth user experience  
- ⚡ **Real-time Results:** Fast backend processing  

---

## 🛠 Tech Stack

### **Frontend**
- React.js  
- Axios  
- CSS3  
- Hosted on **Vercel**

### **Backend**
- Node.js  
- Express.js  
- Tesseract.js (OCR)  
- PDF.js (PDF text extraction)  
- Sentiment (NLP)  
- Multer (file handling)  
- CORS enabled  
- Hosted on **Render**

---

## 🌐 Live Demo
🔗 **https://social-media-content-analyzer-five.vercel.app/**

---

## 🎯 How It Works
1. **Upload:** User selects or drags an image/PDF  
2. **Extract:** Backend extracts text  
3. **Analyze:** NLP model calculates sentiment  
4. **Suggest:** App generates improvement tips  
5. **Display:** Clean UI shows results instantly  

---

## ⚙️ Installation

### **Prerequisites**
- Node.js  
- Git  

---

### **Frontend Setup**
```bash
cd frontend
npm install
npm start
````

### **Backend Setup**

```bash
cd backend
npm install
npm start
```

---

## 🔧 Configuration

### **Backend `.env`**

```env
FRONTEND_URL=https://social-media-content-analyzer-five.vercel.app/
PORT=10000
NODE_ENV=production
```

---

## 📁 Project Structure

```
root/
 ├── frontend/
 │    ├── src/
 │    ├── public/
 │    └── package.json
 ├── backend/
 │    ├── controllers/
 │    ├── routes/
 │    ├── uploads/
 │    └── package.json
 ├── README.md
```

---

## ▶️ Usage

1. Visit the live demo or run locally
2. Upload a PDF/image
3. Wait for processing
4. View sentiment score + improvement suggestions

---

## 🛠 Troubleshooting

* **OCR not working?**
  Ensure image text is clear and readable.

* **CORS errors?**
  Verify `FRONTEND_URL` in `.env`.

* **PDF not detected?**
  Confirm PDF is not password-protected.

---

## 🙌 Acknowledgments

* **Tesseract.js** → OCR
* **PDF.js** → PDF parsing
* **Sentiment** → NLP analysis

---
