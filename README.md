# 📊 Optiver Research — Trading at the Close

> AI-powered stock closing price prediction using LightGBM on real Optiver Kaggle dataset.

![Python](https://img.shields.io/badge/Python-3.11-blue) ![LightGBM](https://img.shields.io/badge/ML-LightGBM-orange) ![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green) ![React](https://img.shields.io/badge/Frontend-React+TS-61DAFB)

🔗 **Live Demo:** [optiver-trading.vercel.app](https://optiver-trading.vercel.app)

---

## 📸 Screenshot

![Dashboard](https://raw.githubusercontent.com/snehal-thombare08/optiver-research/main/Screenshot%202026-06-01%20235522.png)

---

## 🚀 Features

- 🧠 **LightGBM model** trained on 500K real NASDAQ order book data
- 📊 **12 engineered features** — WAP, Spread, Imbalance, Price Pressure
- ⚡ **FastAPI backend** with real-time prediction
- 📈 **Feature Importance chart** — interactive React dashboard
- 🎯 **Validation MAE: 5.1552**

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| ML Model | LightGBM |
| Backend | FastAPI |
| Frontend | React + TypeScript |
| Charts | Recharts |
| Data | Optiver Kaggle Competition |
| Deployment | Vercel + Render |

---

## ⚙️ Setup

```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm start
```

---

## 📖 Usage

1. Open [optiver-trading.vercel.app](https://optiver-trading.vercel.app)
2. Enter order book features (bid_price, ask_price, imbalance, etc.)
3. Click **Predict**
4. View predicted closing price + Feature Importance chart

---

## 👩‍💻 Author

Binary Mind — [GitHub](https://github.com/binarymind-dev)
