const Tesseract = require("tesseract.js");

exports.extractImageText = async (imagePath) => {
  try {
    const result = await Tesseract.recognize(imagePath, "eng");
    return result.data.text;
  } catch (error) {
    console.error("❌ OCR extraction failed:", error);
    throw new Error("Failed to extract text from image.");
  }
};
