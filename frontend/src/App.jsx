import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = "https://employee-turnover-backend.onrender.com/predict";

function App() {
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

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* NAVBAR */}
      <header className="bg-blue-600 text-white shadow-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl">👥</span>
            <span>Employee Churn Portal</span>
          </div>
          <nav className="flex gap-6 text-sm font-medium">
            <button onClick={() => scrollToSection("home")} className="hover:opacity-80">
              Home
            </button>
            <button onClick={() => scrollToSection("predict")} className="hover:opacity-80">
              Dashboard
            </button>
            <button onClick={() => scrollToSection("about")} className="hover:opacity-80">
              About
            </button>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        id="home"
        className="bg-gradient-to-r from-sky-50 to-slate-50 border-b border-slate-200"
      >
        <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm font-semibold text-blue-600 mb-2">
              AI-Powered HR Analytics
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-snug mb-4">
              Employee Retention Through{" "}
              <span className="text-blue-600">AI-Powered Insights</span>
            </h1>
            <p className="text-slate-600 mb-6">
              Transform your HR decisions with our advanced machine learning solution
              that predicts employee churn with high accuracy and helps you take
              proactive retention measures.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollToSection("predict")}
                className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
              >
                Try Prediction
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-800 font-semibold bg-white hover:bg-slate-50 transition"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Simple illustration block – you can replace with <img src="..."/> later */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
              <div className="h-40 bg-slate-900 rounded-2xl mb-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_#fb923c,_transparent_55%),_radial-gradient(circle_at_bottom,_#22d3ee,_transparent_55%)]" />
                <div className="absolute inset-4 bg-slate-900/50 rounded-xl border border-slate-700" />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-orange-200 flex items-center justify-center text-xl">
                  👨‍💻
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    HR Data Scientist
                  </p>
                  <p className="text-xs text-slate-500">
                    Monitoring churn predictions...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="about" className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 text-slate-900">
            Why Choose Our Platform?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon="📈"
              title="Data-Driven Insights"
              text="Make informed decisions based on advanced analytics and machine learning predictions."
            />
            <FeatureCard
              icon="👥"
              title="Employee Focus"
              text="Identify at-risk employees early and take proactive retention measures."
            />
            <FeatureCard
              icon="🤖"
              title="AI-Powered"
              text="Leverage state-of-the-art machine learning algorithms for accurate predictions."
            />
            <FeatureCard
              icon="🛡️"
              title="Secure & Reliable"
              text="Your data is protected with enterprise-grade security practices."
            />
          </div>
        </div>
      </section>

      {/* PREDICTION FORM SECTION */}
      <section
        id="predict"
        className="bg-gradient-to-br from-slate-50 to-sky-50 border-t border-slate-200"
      >
        <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-center mb-2 text-slate-900">
              Employee Churn Predictor
            </h2>
            <p className="text-center text-slate-500 mb-8 text-sm md:text-base">
              Enter employee details below to predict the likelihood of them
              leaving the organization. Our AI model analyzes multiple factors
              to provide accurate predictions.
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

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-slate-500 flex justify-between">
          <span>© {new Date().getFullYear()} Employee Churn Portal</span>
          <span>Built by Himanshu Vyas</span>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-slate-50 rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col gap-2">
      <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-lg">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="text-xs text-slate-500">{text}</p>
    </div>
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

export default App;
