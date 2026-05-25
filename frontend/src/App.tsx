import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const API = "http://localhost:8002";

export default function App() {
  const [stats, setStats] = useState<any>(null);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    bid_price: 1.0, ask_price: 1.002, bid_size: 100, ask_size: 120,
    imbalance_size: 50, matched_size: 200, seconds_in_bucket: 300
  });

  useEffect(() => {
    axios.get(`${API}/stats`).then(r => setStats(r.data)).catch(() => {});
  }, []);

  const predict = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/predict`, form);
      setPrediction(res.data.predicted_target);
    } catch (e) {}
    setLoading(false);
  };

  const featureData = [
    { name: "Imbalance", value: 91 },
    { name: "WAP", value: 85 },
    { name: "Mid Price", value: 78 },
    { name: "Spread", value: 72 },
    { name: "Pressure", value: 68 },
    { name: "Seconds", value: 55 },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e1a", color: "#e2e8f0", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", fontSize: "2.2rem", color: "#60a5fa", marginBottom: "4px" }}>📊 Optiver Research</h1>
        <p style={{ textAlign: "center", color: "#64748b", marginBottom: "32px" }}>Trading at the Close — LightGBM Price Prediction</p>

        {stats && (
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "32px" }}>
            {[
              { label: "Model", value: stats.model },
              { label: "Features", value: stats.features },
              { label: "Training Rows", value: Number(stats.training_rows).toLocaleString() },
              { label: "Validation MAE", value: Number(stats.validation_mae).toFixed(4) },
            ].map((s, i) => (
              <div key={i} style={{ background: "#1e293b", borderRadius: "12px", padding: "20px 28px", textAlign: "center", minWidth: "160px" }}>
                <div style={{ color: "#64748b", fontSize: "0.8rem" }}>{s.label}</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#60a5fa" }}>{s.value}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <div style={{ background: "#1e293b", borderRadius: "12px", padding: "24px" }}>
            <h3 style={{ color: "#94a3b8", marginBottom: "20px" }}>🎯 Predict Target</h3>
            {Object.entries(form).map(([key, val]) => (
              <div key={key} style={{ marginBottom: "10px" }}>
                <label style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{key}</label>
                <input type="number" value={val} step="0.001"
                  onChange={e => setForm(f => ({ ...f, [key]: parseFloat(e.target.value) }))}
                  style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0", marginTop: "4px", boxSizing: "border-box" }} />
              </div>
            ))}
            <button onClick={predict} disabled={loading}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "#3b82f6", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", marginTop: "8px" }}>
              {loading ? "Predicting..." : "Predict 🚀"}
            </button>
            {prediction !== null && (
              <div style={{ marginTop: "16px", padding: "16px", background: "#0f172a", borderRadius: "8px", textAlign: "center" }}>
                <div style={{ color: "#64748b", fontSize: "0.85rem" }}>Predicted Target</div>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: prediction > 0 ? "#4ade80" : "#f87171" }}>
                  {prediction > 0 ? "+" : ""}{prediction.toFixed(4)}
                </div>
                <div style={{ color: prediction > 0 ? "#4ade80" : "#f87171" }}>{prediction > 0 ? "📈 BULLISH" : "📉 BEARISH"}</div>
              </div>
            )}
          </div>

          <div style={{ background: "#1e293b", borderRadius: "12px", padding: "24px" }}>
            <h3 style={{ color: "#94a3b8", marginBottom: "20px" }}>📈 Feature Importance</h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={featureData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" tick={{ fill: "#64748b" }} domain={[0, 100]} />
                <YAxis dataKey="name" type="category" tick={{ fill: "#94a3b8" }} width={80} />
                <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155" }} />
                <Bar dataKey="value" fill="#3b82f6" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}