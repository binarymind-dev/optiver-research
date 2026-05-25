import sys
sys.path.append(".")
from features import load_data, add_features, get_features_and_target
from model import train_model, save_model

print("Loading data...")
df = load_data("../data/train.csv", nrows=500000)
print(f"Shape: {df.shape}")

print("Adding features...")
df = add_features(df)

X, y = get_features_and_target(df)
print(f"X: {X.shape}, y: {y.shape}")

print("Training LightGBM...")
model, mae = train_model(X, y)

save_model(model, "../models/lgbm_model.pkl")
print(f"Done! MAE: {mae:.6f}")