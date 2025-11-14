const express = require("express");
const cors = require("cors");
const multer = require("multer");
const analyzeRoutes = require("./routes/analyzeRoutes");
const fs = require("fs");
const path = require("path");

const app = express();

// ---------------------------------------------
// ✅ FIXED CORS - ONLY correct frontend domains
// ---------------------------------------------
app.use(
	cors({
		origin: [
			"https://social-media-content-analyzer-five.vercel.app", // NEW VERCEL URL
			process.env.FRONTEND_URL,
			"http://localhost:3000",
		],
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type"],
		credentials: true,
	})
);

app.use(express.json());

// ---------------------------------------------
// Ensure uploads folder exists
// ---------------------------------------------
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use("/uploads", express.static(uploadsDir));

// ---------------------------------------------
// Multer for file uploads
// ---------------------------------------------
const upload = multer({ dest: "uploads/" });

app.use("/api/analyze", upload.single("file"), analyzeRoutes);

// ---------------------------------------------
// Health Check Route
// ---------------------------------------------
app.get("/api/health", (req, res) => {
	res.status(200).json({
		status: "OK",
		message: "Server is running successfully",
		timestamp: new Date().toISOString(),
	});
});

// ---------------------------------------------
// 404 Handler
// ---------------------------------------------
app.use((req, res) => {
	res.status(404).json({
		error: "Route not found",
		path: req.path,
		method: req.method,
	});
});

// ---------------------------------------------
// Server Listen
// ---------------------------------------------
const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
	console.log(`✅ Server running on port ${PORT}`);
	console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
});
