 Employee Turnover Prediction

A full-stack web application that predicts whether an employee is likely to leave the organization based on key HR attributes. The goal is to help HR teams identify at-risk employees early and take proactive retention actions

🔍 Overview

This project exposes a machine learning model through a REST API (backend) and a modern single-page application (frontend) where users can:

- Input employee details (e.g., satisfaction level, years at company, number of projects, etc.).
- Get a prediction: **Will the employee leave or stay?**
- View prediction probability and interpretation hints.
- Explore basic summaries and descriptions of the dataset and model.

The repository is organized with two main folders:

- `frontend/` – React single-page application (SPA)
- `backend/` – Python backend with the ML model and API


 Features

- Employee attrition prediction using a trained ML model.
- Form-based UI to enter employee features.
- Input validation and basic error handling on the frontend.
- Clear result message (e.g., “Likely to Leave” / “Likely to Stay”).
- Configurable model (you can retrain or swap models in the backend).
- Ready to deploy (frontend works with static hosting / Vercel; backend can be hosted separately).

 Tech Stack

 Frontend

- Language: JavaScript (React)
- Routing: React Router (HashRouter)
- Build Tool / Dev Server: Typical React tooling (e.g., Vite or CRA – check `frontend` for exact setup)
- Styling: CSS

 Backend

- Language: Python
- Machine Learning: scikit-learn (classification model)
- Data Handling: pandas, NumPy
- API Framework: Python web framework (e.g., FastAPI / Flask – see `backend` code for the specific one)
- Model Serialization: pickle / joblib for saving and loading the trained model

> If you change or confirm the exact libraries, you can update this section to list them precisely.

 Project Structure

```text
EmployeeTurnover/
├── frontend/        # React frontend (user interface)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/   # Home, About, Prediction page, etc.
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
│
└── backend/         # Python backend (API + ML model)
    ├── data/        # Dataset(s) used for training (if included)
    ├── models/      # Saved / serialized models (.pkl, .joblib)
    ├── main.py      # API entry point (or similar)
    ├── requirements.txt
    └── ...
