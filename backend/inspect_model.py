import pickle
import pandas as pd
import os

model_path = os.path.join("model", "model.pkl")

with open(model_path, "rb") as f:
    model = pickle.load(f)

print("\n✅ Model loaded successfully!")
print("Model type:", type(model))

# Try to show feature names used during training
try:
    print("\n📋 Feature names used during training:")
    print(model.feature_names_in_)
except AttributeError:
    print("\n⚠️ This model does not store feature names directly.")

# Some sklearn pipelines or models store preprocessing steps inside
if hasattr(model, "get_params"):
    print("\nModel parameters available:")
    print(list(model.get_params().keys())[:10])

