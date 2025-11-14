import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { fileURLToPath, pathToFileURL } from "url";

// ✅ Point workerSrc to an internal blob URL — satisfies pdfjs-dist
const workerSrcPath = pathToFileURL(
  "./node_modules/pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).href;
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrcPath;

export async function extractPDFText(filePathOrBuffer) {
  try {
    console.log("📄 PDF detected. Extracting text...");

    // Convert to Uint8Array
    const data = Buffer.isBuffer(filePathOrBuffer)
      ? new Uint8Array(filePathOrBuffer)
      : new Uint8Array(fs.readFileSync(filePathOrBuffer));

    // Load PDF
    const loadingTask = pdfjsLib.getDocument({ data });
    const pdf = await loadingTask.promise;

    let fullText = "";
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const text = content.items.map((item) => item.str).join(" ");
      fullText += text + "\n";
    }

    console.log("✅ PDF extraction successful!");
    return fullText.trim();
  } catch (err) {
    console.error("❌ PDF extraction failed:", err);
    throw new Error("Failed to extract text from PDF.");
  }
}