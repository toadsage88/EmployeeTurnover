import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = "https://employee-turnover-backend.onrender.com/predict";

function Dashboard() {
  const [formData, setFormData] = useState({
    satisfaction_level: "",
    last_evaluation: "",
    number_project: "",
    average_montly_hours: "",
    time_spend_company: "",
    Work_accident: "",
    promotion_last_5years: "",
    Departments: "",
    salary: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);

    try {
      const response = await axios.post(BACKEND_URL, formData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error(error);
      setPrediction("Error: Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 to-sky-50 min-h-[calc(100vh-64px)] flex items-center">
      <div className="max-w-6xl mx-auto px-4 py-10 w-full">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-center mb-2 text-slate-900">
            Employee Churn Predictor
          </h2>
          <p className="text-center text-slate-500 mb-8 text-sm md:text-base">
            Enter employee details below to predict the likelihood of them
            leaving the organization. Our AI model analyzes multiple factors to
            provide accurate predictions.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid gap-4 md:grid-cols-2 text-sm"
          >
            <InputField
              label="Satisfaction Level (0–1)"
              name="satisfaction_level"
              type="number"
              step="0.01"
              value={formData.satisfaction_level}
              onChange={handleChange}
            />
            <InputField
              label="Last Evaluation (0–1)"
              name="last_evaluation"
              type="number"
              step="0.01"
              value={formData.last_evaluation}
              onChange={handleChange}
            />
            <InputField
              label="Number of Projects"
              name="number_project"
              type="number"
              value={formData.number_project}
              onChange={handleChange}
            />
            <InputField
              label="Average Monthly Hours"
              name="average_montly_hours"
              type="number"
              value={formData.average_montly_hours}
              onChange={handleChange}
            />
            <InputField
              label="Years at Company"
              name="time_spend_company"
              type="number"
              value={formData.time_spend_company}
              onChange={handleChange}
            />
            <InputField
              label="Work Accident (0 or 1)"
              name="Work_accident"
              type="number"
              value={formData.Work_accident}
              onChange={handleChange}
            />
            <InputField
              label="Promotion in Last 5 Years (0 or 1)"
              name="promotion_last_5years"
              type="number"
              value={formData.promotion_last_5years}
              onChange={handleChange}
            />
            <InputField
              label="Department (e.g. sales, hr, it)"
              name="Departments"
              type="text"
              value={formData.Departments}
              onChange={handleChange}
            />
            <InputField
              label="Salary (low, medium, high)"
              name="salary"
              type="text"
              value={formData.salary}
              onChange={handleChange}
            />

            <div className="md:col-span-2 flex justify-center mt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2.5 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Predicting..." : "Predict"}
              </button>
            </div>
          </form>

          {prediction && (
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500 mb-1">Prediction Result</p>
              <p className="text-lg font-semibold text-blue-700">
                {prediction}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function InputField({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-slate-700 text-xs font-medium">{label}</label>
      <input
        {...props}
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
        required
      />
    </div>
  );
}

export default Dashboard;
