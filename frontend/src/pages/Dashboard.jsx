import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode class to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      console.log("✅ Backend Response:", response.data);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-700 bg-gradient-to-br animate-gradient-x ${
        darkMode
          ? "from-gray-900 via-purple-900 to-blue-900"
          : "from-blue-500 via-purple-500 to-pink-500"
      } p-4`}
    >
      {/* 🌗 Theme Toggle Button */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-full bg-white/30 backdrop-blur-md text-white font-medium border border-white/40 hover:bg-white/50 hover:scale-105 transition-all duration-300"
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* 💎 Glass Card */}
      <div className="max-w-xl w-full bg-white/30 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700/50 shadow-2xl rounded-3xl p-8 text-gray-900 dark:text-gray-100 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]">
        <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-lg">
          Employee Churn Prediction
        </h2>

        {/* 🧾 Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            ["satisfaction_level", "Satisfaction Level (0-1)", "number"],
            ["last_evaluation", "Last Evaluation (0-1)", "number"],
            ["number_project", "Number of Projects", "number"],
            ["average_montly_hours", "Average Monthly Hours", "number"],
            ["time_spend_company", "Years at Company", "number"],
            ["Work_accident", "Work Accident (0 or 1)", "number"],
            ["promotion_last_5years", "Promotion in Last 5 Years (0 or 1)", "number"],
          ].map(([name, label, type]) => (
            <div key={name}>
              <label className="block font-medium text-white drop-shadow-md">
                {label}
              </label>
              <input
                type={type}
                name={name}
                step="0.01"
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700/40 dark:border-gray-600 transition-all duration-300 hover:bg-white/30 dark:hover:bg-gray-700/60"
                required
              />
            </div>
          ))}

          <div>
            <label className="block font-medium text-white drop-shadow-md">
              Department
            </label>
            <input
              type="text"
              name="Departments"
              placeholder="e.g., sales, hr, IT"
              value={formData.Departments}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700/40 dark:border-gray-600 transition-all duration-300 hover:bg-white/30 dark:hover:bg-gray-700/60"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-white drop-shadow-md">
              Salary (low, medium, high)
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700/40 dark:border-gray-600 transition-all duration-300 hover:bg-white/30 dark:hover:bg-gray-700/60"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.03]"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {prediction && (
          <div className="mt-6 text-center text-lg font-semibold text-white">
            🧠 Prediction: <span className="text-yellow-200">{prediction}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
