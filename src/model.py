import lightgbm as lgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import pickle

def train_model(X, y):
    X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)
    model = lgb.LGBMRegressor(n_estimators=500, learning_rate=0.05, max_depth=6, num_leaves=31, random_state=42, n_jobs=-1)
    model.fit(X_train, y_train, eval_set=[(X_val, y_val)], callbacks=[lgb.early_stopping(50), lgb.log_evaluation(100)])
    mae = mean_absolute_error(y_val, model.predict(X_val))
    print(f"Validation MAE: {mae:.6f}")
    return model, mae

def save_model(model, path):
    with open(path, "wb") as f:
        pickle.dump(model, f)
    print(f"Model saved!")

def load_model(path):
    with open(path, "rb") as f:
        return pickle.load(f)