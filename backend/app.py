from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import os
import sqlite3

app = Flask(__name__)
CORS(app)

model_path = os.path.join("model", "model.pkl")
model = pickle.load(open(model_path, "rb"))

@app.route("/")
def home():
    return "✅ Employee Churn Prediction Backend is Running!"

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({"token": "valid-user-session"}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    dept_map = {
        'sales': 0, 'hr': 1, 'technical': 2, 'support': 3,
        'it': 4, 'product_mng': 5, 'marketing': 6, 'management': 7
    }
    salary_map = {'low': 0, 'medium': 1, 'high': 2}

    dept_val = dept_map.get(str(data.get('Departments', 'sales')).lower(), 0)
    salary_val = salary_map.get(str(data.get('salary', 'medium')).lower(), 1)

    mapped_data = {
        'satisfaction_level': float(data.get('satisfaction_level', 0)),
        'last_evaluation': float(data.get('last_evaluation', 0)),
        'number_project': int(data.get('number_project', 0)),
        'average_montly_hours': float(data.get('average_montly_hours', 0)),
        'time_spend_company': int(data.get('time_spend_company', 0)),
        'Work_accident': int(data.get('Work_accident', 0)),
        'promotion_last_5years': int(data.get('promotion_last_5years', 0)),
        'Departments': dept_val,
        'salary': salary_val
    }

    df = pd.DataFrame([mapped_data])
    prediction = model.predict(df)[0]
    result = "Employee will leave" if prediction == 1 else "Employee will stay"
    return jsonify({'prediction': result})

if __name__ == "__main__":
    print("✅ Starting Flask server...")
    app.run(host="0.0.0.0", port=5000)


