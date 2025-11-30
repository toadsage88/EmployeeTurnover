// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "https://employee-turnover-backend.onrender.com/predict";

function Dashboard() {
  const navigate = useNavigate();

  // 🔒 Redirect to login if no token
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    satisfaction_level: "5",
    last_evaluation: "5",
    number_project: "",
    average_montly_hours: "",
    time_spend_company: "",
    Work_accident: "0",
    promotion_last_5years: "0",
    Departments: "",
    salary: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);

    try {
      // 🔁 convert 1–10 scale to 0–1 for the ML model
      const payload = {
        ...formData,
        satisfaction_level: Number(formData.satisfaction_level) / 10,
        last_evaluation: Number(formData.last_evaluation) / 10,
      };

      const response = await axios.post(BACKEND_URL, payload);
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
            {/* SLIDERS */}
            <SliderField
              label="Satisfaction Level (1–10)"
              help="Overall job satisfaction score given by the employee."
              name="satisfaction_level"
              min={1}
              max={10}
              value={formData.satisfaction_level}
              onChange={handleChange}
            />
            <SliderField
              label="Last Evaluation (1–10)"
              help="Performance evaluation score from the last review."
              name="last_evaluation"
              min={1}
              max={10}
              value={formData.last_evaluation}
              onChange={handleChange}
            />

            {/* NUMBER INPUTS */}
            <InputField
              label="Number of Projects"
              name="number_project"
              type="number"
              min="1"
              max="20"
              placeholder="e.g. 3"
              value={formData.number_project}
              onChange={handleChange}
              help="How many projects the employee is currently handling."
            />
            <InputField
              label="Average Monthly Hours"
              name="average_montly_hours"
              type="number"
              min="40"
              max="350"
              placeholder="e.g. 160"
              value={formData.average_montly_hours}
              onChange={handleChange}
              help="Average number of hours the employee works per month."
            />
            <InputField
              label="Years at Company"
              name="time_spend_company"
              type="number"
              min="0"
              max="20"
              placeholder="e.g. 4"
              value={formData.time_spend_company}
              onChange={handleChange}
              help="Total years the employee has spent in the organization."
            />

            {/* DROPDOWNS */}
            <SelectField
              label="Work Accident"
              name="Work_accident"
              value={formData.Work_accident}
              onChange={handleChange}
              options={[
                { value: "0", label: "No" },
                { value: "1", label: "Yes" },
              ]}
              help="Has the employee experienced a work accident?"
            />
            <SelectField
              label="Promotion in Last 5 Years"
              name="promotion_last_5years"
              value={formData.promotion_last_5years}
              onChange={handleChange}
              options={[
                { value: "0", label: "No" },
                { value: "1", label: "Yes" },
              ]}
              help="Has the employee been promoted in the last 5 years?"
            />
            <SelectField
              label="Department"
              name="Departments"
              value={formData.Departments}
              onChange={handleChange}
              options={[
                { value: "", label: "Select Department..." },
                { value: "sales", label: "Sales" },
                { value: "hr", label: "Human Resources" },
                { value: "technical", label: "Technical" },
                { value: "support", label: "Support" },
                { value: "it", label: "IT" },
                { value: "product_mng", label: "Product Management" },
                { value: "marketing", label: "Marketing" },
                { value: "management", label: "Management" },
              ]}
              help="Department where the employee works."
            />
            <SelectField
              label="Salary Range"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              options={[
                { value: "", label: "Select Salary Range..." },
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
              ]}
              help="Overall salary band of the employee."
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

/* 🔹 Slider field for 1–10 values */
function SliderField({ label, name, value, min, max, onChange, help }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs font-medium text-slate-700">
        <span>{label}</span>
        {help && (
          <span
            className="text-slate-400 cursor-help"
            title={help}
          >
            ⓘ
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <input
          type="range"
          name={name}
          min={min}
          max={max}
          step="1"
          value={value}
          onChange={onChange}
          className="flex-1 accent-blue-600"
        />
        <span className="w-10 text-center text-xs font-semibold text-blue-700 bg-blue-50 rounded-lg py-1">
          {value}
        </span>
      </div>
    </div>
  );
}

/* 🔹 Text/number input with small tooltip */
function InputField({ label, help, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="text-slate-700 text-xs font-medium">{label}</label>
        {help && (
          <span
            className="text-slate-400 text-[11px] cursor-help"
            title={help}
          >
            ⓘ
          </span>
        )}
      </div>
      <input
        {...props}
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
        required
      />
    </div>
  );
}

/* 🔹 Select dropdown with tooltip */
function SelectField({ label, help, options, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="text-slate-700 text-xs font-medium">{label}</label>
        {help && (
          <span
            className="text-slate-400 text-[11px] cursor-help"
            title={help}
          >
            ⓘ
          </span>
        )}
      </div>
      <select
        {...props}
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
        required
      >
        {options.map((opt) => (
          <option key={opt.value || opt.label} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dashboard;
