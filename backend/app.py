from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import os
import sqlite3

app = Flask(__name__)
CORS(app)

# ====== LOAD MODEL ======
MODEL_PATH = os.path.join("model", "model.pkl")
model = pickle.load(open(MODEL_PATH, "rb"))


# ====== SIMPLE USER DATABASE (SQLite) ======
def init_db():
    """
    Create the users table and a default demo user if not already present.
    Database file: users.db (created in backend folder).
    """
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
        """
    )

    # default demo user
    cursor.execute(
        "INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)",
        ("admin", "admin123"),
    )

    conn.commit()
    conn.close()


# Initialize database at startup
init_db()


# ====== ROUTES ======

@app.route("/")
def home():
    return "✅ Employee Churn Prediction Backend is Running!"


@app.route("/login", methods=["POST"])
def login():
    """
    Expects JSON:
    {
      "username": "...",
      "password": "..."
    }

    If user exists in SQLite users.db, returns a simple token.
    """
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        (username, password),
    )
    user = cursor.fetchone()
    conn.close()

    if user:
        # For demo, token is just a static string
        return jsonify({"token": "valid-user-session"}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401


# (Optional) simple register endpoint if you ever want it:
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    try:
        conn = sqlite3.connect("users.db")
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            (username, password),
        )
        conn.commit()
        conn.close()
        return jsonify({"message": "User registered successfully"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username already exists"}), 409


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json() or {}

    # same mappings you used before
    dept_map = {
        "sales": 0,
        "hr": 1,
        "technical": 2,
        "support": 3,
        "it": 4,
        "product_mng": 5,
        "marketing": 6,
        "management": 7,
    }
    salary_map = {"low": 0, "medium": 1, "high": 2}

    dept_val = dept_map.get(str(data.get("Departments", "sales")).lower(), 0)
    salary_val = salary_map.get(str(data.get("salary", "medium")).lower(), 1)

    mapped_data = {
        "satisfaction_level": float(data.get("satisfaction_level", 0)),
        "last_evaluation": float(data.get("last_evaluation", 0)),
        "number_project": int(data.get("number_project", 0)),
        "average_montly_hours": float(data.get("average_montly_hours", 0)),
        "time_spend_company": int(data.get("time_spend_company", 0)),
        "Work_accident": int(data.get("Work_accident", 0)),
        "promotion_last_5years": int(data.get("promotion_last_5years", 0)),
        "Departments": dept_val,
        "salary": salary_val,
    }

    df = pd.DataFrame([mapped_data])
    prediction = model.predict(df)[0]
    result = "Employee will leave" if prediction == 1 else "Employee will stay"
    return jsonify({"prediction": result})


if __name__ == "__main__":
    print("✅ Starting Flask server...")
    # For local testing; Render will use gunicorn app:app
    app.run(host="0.0.0.0", port=5000)



