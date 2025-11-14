import React, { useState, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const [file, setFile] = useState(null);
	const [dragging, setDragging] = useState(false);
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [collapsed, setCollapsed] = useState(false);
	const inputRef = useRef();

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
		setError("");
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragging(false);
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			setFile(e.dataTransfer.files[0]);
			e.dataTransfer.clearData();
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragging(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragging(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!file) {
			setError("Please upload a file first!");
			return;
		}
		const formData = new FormData();
		formData.append("file", file);
		setLoading(true);
		setError("");
		try {
			const res = await axios.post(
				"https://social-media-content-analyzer-kdj9.onrender.com/api/analyze",
				formData,
				{ headers: { "Content-Type": "multipart/form-data" } }
			);
			setResult(res.data);
			setCollapsed(false);
		} catch (err) {
			setError("Something went wrong while analyzing the file.");
		} finally {
			setLoading(false);
		}
	};

	const copyText = async () => {
		if (!result?.text) return;
		await navigator.clipboard.writeText(result.text);
		alert("Copied to clipboard.");
	};

	const downloadText = () => {
		if (!result?.text) return;
		const blob = new Blob([result.text], { type: "text/plain" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = (file?.name || "extracted") + ".txt";
		link.click();
		URL.revokeObjectURL(link.href);
	};

	return (
		<div className="app-wrap">
			<div className="card">
				<h1>Social Media Content Analyzer</h1>

				<form onSubmit={handleSubmit} className="upload-form">
					<div
						className={`drop-zone ${dragging ? "dragging" : ""}`}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
						onClick={() => inputRef.current.click()}
						role="button"
						tabIndex={0}>
						{!file ? (
							<div className="drop-inner">
								<span className="icon">📁</span>
								<div className="hint">
									<strong>Drag & drop</strong> PDF / Image here
									<br />
									or <u>click to browse</u>
								</div>
							</div>
						) : (
							<div className="file-row">
								<div className="file-chip">📄 {file.name}</div>
								<div className="file-meta">
									{(file.size / 1024).toFixed(1)} KB
								</div>
							</div>
						)}

						<input
							type="file"
							ref={inputRef}
							style={{ display: "none" }}
							accept=".pdf, .png, .jpg, .jpeg"
							onChange={handleFileChange}
						/>
					</div>

					<div className="actions">
						<button className="btn primary" type="submit" disabled={loading}>
							{loading ? "Analyzing..." : "Analyze"}
						</button>
						<button
							type="button"
							className="btn ghost"
							onClick={() => {
								setFile(null);
								setResult(null);
								setError("");
							}}>
							Reset
						</button>
					</div>
				</form>

				{error && <div className="error">{error}</div>}

				{result && (
					<div className="result-area">
						<div className="result-header">
							<h3>📝 Extracted Text</h3>
							<div className="result-controls">
								<button
									className="icon-btn"
									onClick={() => setCollapsed((s) => !s)}>
									{collapsed ? "Expand" : "Collapse"}
								</button>
								<button className="icon-btn" onClick={copyText}>
									Copy
								</button>
								<button className="icon-btn" onClick={downloadText}>
									Download
								</button>
							</div>
						</div>

						{!collapsed && (
							<div className="result-grid">
								<pre className="text formatted-text" aria-live="polite">
									{result.text}
								</pre>

								<aside className="sentiment-card">
									<div
										className={`sent-badge ${result.sentiment.toLowerCase()}`}>
										{result.sentiment}
									</div>
									<div className="score">
										Score: <strong>{result.score}</strong>
									</div>
									<p className="suggestion">💡 {result.suggestion}</p>
									<div className="small-meta">
										<div>
											Words: {result.text?.split(/\s+/).filter(Boolean).length}
										</div>
										<div>Pages: {result.pages ?? "—"}</div>
									</div>
								</aside>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
