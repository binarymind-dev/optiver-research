import pandas as pd
import numpy as np

def load_data(path, nrows=500000):
    df = pd.read_csv(path, nrows=nrows)
    return df

def add_features(df):
    df["wap"] = (df["bid_price"] * df["ask_size"] + df["ask_price"] * df["bid_size"]) / (df["bid_size"] + df["ask_size"])
    df["spread"] = df["ask_price"] - df["bid_price"]
    df["imbalance_ratio"] = df["imbalance_size"] / (df["matched_size"] + 1)
    df["price_pressure"] = df["imbalance_size"] * (df["ask_price"] - df["bid_price"])
    df["mid_price"] = (df["ask_price"] + df["bid_price"]) / 2
    return df

def get_features_and_target(df):
    feature_cols = ["wap", "spread", "imbalance_ratio", "price_pressure",
                    "mid_price", "bid_price", "ask_price", "bid_size",
                    "ask_size", "imbalance_size", "matched_size", "seconds_in_bucket"]
    df = df.dropna(subset=feature_cols + ["target"])
    return df[feature_cols], df["target"]