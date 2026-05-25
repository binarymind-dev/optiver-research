from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
import pandas as pd
import sys
sys.path.append("../src")
from features import add_features

app = FastAPI(title="Optiver Research API")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

with open("../models/lgbm_model.pkl", "rb") as f:
    model = pickle.load(f)

@app.get("/")
def root():
    return {"message": "Optiver Research API Running!"}

@app.get("/stats")
def stats():
    return {
        "model": "LightGBM",
        "features": 12,
        "training_rows": 500000,
        "validation_mae": 5.155228,
        "competition": "Optiver Trading at the Close"
    }

@app.post("/predict")
def predict(data: dict):
    try:
        df = pd.DataFrame([data])
        df = add_features(df)
        feature_cols = ["wap", "spread", "imbalance_ratio", "price_pressure",
                        "mid_price", "bid_price", "ask_price", "bid_size",
                        "ask_size", "imbalance_size", "matched_size", "seconds_in_bucket"]
        pred = model.predict(df[feature_cols])[0]
        return {"predicted_target": round(float(pred), 6), "status": "success"}
    except Exception as e:
        return {"error": str(e)}