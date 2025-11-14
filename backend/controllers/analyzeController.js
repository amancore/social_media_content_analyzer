const fs = require("fs");
const { extractPDFText } = require("../utils/pdfExtractor.js");
const { extractImageText } = require("../utils/ocrExtractor");
const { analyzeSentiment } = require("../utils/sentimentAnalyzer");

exports.analyzeFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    console.log("📂 File received:", file);

    let text = "";

    if (file.mimetype && file.mimetype.includes("pdf")) {
      console.log("🧾 PDF detected. Extracting text...");
      const filePath = file.path.replace(/\\/g, "/"); // Windows path fix
      const dataBuffer = fs.readFileSync(filePath);
      text = await extractPDFText(dataBuffer);
    } else if (file.mimetype && file.mimetype.startsWith("image/")) {
      console.log("🖼 Image detected. Running OCR...");
      const filePath = file.path.replace(/\\/g, "/");
      text = await extractImageText(filePath);
    } else {
      console.log("❌ Unsupported file type:", file.mimetype);
      return res.status(400).json({ error: "Unsupported file type." });
    }

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        error: "No readable text found in the uploaded document.",
      });
    }

    console.log("📊 Performing sentiment analysis...");
    const sentimentResult = analyzeSentiment(text);

    res.json({
      text,
      sentiment: sentimentResult.label,
      score: sentimentResult.score,
      suggestion: sentimentResult.suggestion,
    });
  } catch (error) {
    console.error("❌ Error in analyzeFile:", error);
    res.status(500).json({ error: error.message });
  }
};
