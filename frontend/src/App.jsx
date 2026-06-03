import { useState } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadPdf = async () => {
    if (!file) {
      alert("Please choose a PDF file first");
      return;
    }

    setLoading(true);
    setResult("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://pdf-summarizer-api-0dlb.onrender.com/upload-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data.summary || "No summary found in this PDF.");
    } catch (error) {
      setResult("Something went wrong. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #020617, #0f172a, #1e293b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "900px",
          maxWidth: "100%",
          background: "rgba(255,255,255,0.09)",
          backdropFilter: "blur(14px)",
          borderRadius: "28px",
          padding: "40px",
          color: "white",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "44px",
            marginBottom: "10px",
            color: "white",
            fontWeight: "800",
          }}
        >
          🤖 AI PDF Summarizer
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#cbd5e1",
            marginBottom: "35px",
          }}
        >
          Upload your PDF and extract its content instantly.
        </p>

        <div
          style={{
            border: "2px dashed rgba(255,255,255,0.35)",
            borderRadius: "20px",
            padding: "30px",
            textAlign: "center",
            background: "rgba(15,23,42,0.7)",
            marginBottom: "25px",
          }}
        >
          <p style={{ fontSize: "18px", marginBottom: "15px" }}>
            Choose a PDF file
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ color: "white" }}
          />

          {file && (
            <p style={{ color: "#93c5fd", marginTop: "15px" }}>
              Selected: {file.name}
            </p>
          )}

          <button
            onClick={uploadPdf}
            disabled={loading}
            style={{
              marginTop: "25px",
              background: loading ? "#64748b" : "#2563eb",
              color: "white",
              border: "none",
              padding: "14px 32px",
              borderRadius: "12px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {loading ? "Analyzing PDF..." : "Upload & Analyze"}
          </button>
        </div>

        <div
          style={{
            background: "#020617",
            borderRadius: "20px",
            padding: "25px",
            minHeight: "260px",
            maxHeight: "420px",
            overflowY: "auto",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h2 style={{ marginTop: 0, color: "white" }}>Summary</h2>

          {result ? (
            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontFamily: "inherit",
                lineHeight: "1.8",
                color: "#e2e8f0",
              }}
            >
              {result}
            </pre>
          ) : (
            <p style={{ color: "#94a3b8" }}>
              Your PDF result will appear here...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}