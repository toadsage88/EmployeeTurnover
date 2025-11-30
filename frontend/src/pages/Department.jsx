// src/pages/Department.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BATCH_URL = "https://employee-turnover-backend.onrender.com/predict-batch";

const emptyEmployee = {
  satisfaction_level: "5",
  last_evaluation: "5",
  number_project: "",
  average_montly_hours: "",
  time_spend_company: "",
  Work_accident: "0",
  promotion_last_5years: "0",
  Departments: "",
  salary: "",
};

function Department() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([ { ...emptyEmployee } ]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [predictions, setPredictions] = useState([]);

  // 🔒 Protect route (only logged in users)
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleRowChange = (index, e) => {
    const { name, value } = e.target;
    setEmployees((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };

  const addEmployeeRow = () => {
    setEmployees((prev) => [...prev, { ...emptyEmployee }]);
  };

  const removeEmployeeRow = (index) => {
    setEmployees((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSummary(null);
    setPredictions([]);

    try {
      // Convert satisfaction_level & last_evaluation from 1–10 to 0–1
      const payload = employees.map((emp) => ({
        ...emp,
        satisfaction_level: Number(emp.satisfaction_level) / 10,
        last_evaluation: Number(emp.last_evaluation) / 10,
      }));

      const res = await axios.post(BATCH_URL, payload);
      setSummary(res.data.summary);
      setPredictions(res.data.predictions || []);
    } catch (err) {
      console.error(err);
      setSummary({
        error:
          "Error while contacting batch prediction API. Please check backend /predict-batch.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 to-sky-50 min-h-[calc(100vh-64px)] flex items-center">
      <div className="max-w-6xl mx-auto px-4 py-10 w-full">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-center mb-2 text-slate-900">
            Department-Level Churn Analysis
          </h2>
          <p className="text-center text-slate-500 mb-6 text-sm md:text-base">
            Add multiple employees from a department to estimate how many are at
            risk of leaving. This is useful for HR planning and retention
            strategy.
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs md:text-sm">
            <div className="flex justify-between items-center mb-2">
              <p className="text-slate-600">
                Employees in this batch:{" "}
                <span className="font-semibold text-blue-700">
                  {employees.length}
                </span>
              </p>
              <button
                type="button"
                onClick={addEmployeeRow}
                className="px-3 py-1.5 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700"
              >
                + Add Employee
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="min-w-full text-left border-collapse">
                <thead className="bg-slate-100 text-[11px] uppercase tracking-wide text-slate-600">
                  <tr>
                    <th className="px-3 py-2">#</th>
                    <th className="px-3 py-2">Sat (1–10)</th>
                    <th className="px-3 py-2">Eval (1–10)</th>
                    <th className="px-3 py-2">Projects</th>
                    <th className="px-3 py-2">Monthly Hours</th>
                    <th className="px-3 py-2">Years</th>
                    <th className="px-3 py-2">Accident</th>
                    <th className="px-3 py-2">Promotion</th>
                    <th className="px-3 py-2">Department</th>
                    <th className="px-3 py-2">Salary</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, index) => (
                    <tr
                      key={index}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-3 py-2 align-top text-[11px] font-semibold text-slate-500">
                        {index + 1}
                      </td>
                      <td className="px-3 py-2 align-top">
                        <input
                          type="number"
                          name="satisfaction_level"
                          min="1"
                          max="10"
                          value={emp.satisfaction_level}
                          onChange={(e) => handleRowChange(index, e)}
                          className="w-16 rounded-lg border border-slate-300 bg-slate-50 px-2 py-1 text-xs"
                          required
                        />
                      </td>
                      <td className="px-3 py-2 align-top">
                        <input
                          type="number"
                          name="last_evaluation"
                          min="1"
                          max="10"
                          value={emp.last_evaluation}
                          onChange={(e) => handleRowChange(index, e)}
                          className="w-16 rounded-lg border border-slate-300 bg-slate-50 px-2 py-1 text-xs"
                          required
                        />
                      </td>
                      <td className="px-3 py-2 align-top">
                        <input
                          type="number"
                          name="number_project"
                          min="1"
                          max="20"
                          value={emp.number_project}
                          onChange={(e) => handleRowChange(index, e)}
                          className="w-16 rounded-lg border border-slate-300 bg-slate-50 px-2 py-1 text-xs"
                          required
                        />
                      </td>
                      <td className="px-3 py-2 align-top">
                        <input
                          type="number"
                          name="average_montly_hours"
                          min="40"
                          max="350"
                          value={emp.average_montly_hours}
                          onChange={(e) => handleRowChange(index, e)}
                          className="w-20 rounded-lg border border-slate-300 bg-slate-50 px-2 py-1 text-xs"
                          required
                        />
                      </td>
                      <td className="px-3 py-2 align-top">
                        <input
                          type="number"
                          name="time_spend_company"
                          min="0"
                          max="40"
                          value={emp.time_spend_company}
                          onChange={(e) => handleRowChange(index, e)}
                          className="w-16 rounded-lg border border-slate-300 bg-slate-50 px-2 py-1 text-xs"
                          required
                        />
                      </td>
                      <td className="px-3 py-2 align-top">
                        <select
                          name="Work_accident"
                          value={emp.Work_accident}
                          onChange={(e) => handleRowChange(index, e)}
                          className="w-20 rounded-lg border border-slate-300 bg-slate-50 px-2 py-1 text-xs"
                          required
                        >
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                        </select>
                      </td>
                      <td className="px-3 py-2 align-top">
                        <select
                          name="promotion_last_5years"
                          value={emp.promotion_last_5years}
                          onChange={(e) => handleRowChange(index, e)}
                          className="w-24 rounded-lg border border-slate-300 bg-slate-50 px-2 py-1 text-xs"
                          required
                        >
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                        </select>
                      </td>
                      <td className="px-3 py-2 align-top">
                        <select
                          name="Departments"
                          value={emp.Departments}
                          onChange={(e) => handleRowChange(index, e)}
                          className="w-28 rounded-lg border border-slate-300 bg-slate-50 px-2 py-1 text-xs"
                          required
                        >
                          <option value="">Select...</option>
                          <option value="sales">Sales</option>
                          <option value="hr">HR</option>
                          <option value="technical">Technical</option>
                          <option value="support">Support</option>
                          <option value="it">IT</option>
                          <option value="product_mng">Product Mgmt</option>
                          <option value="marketing">Marketing</option>
                          <option value="management">Management</option>
                        </select>
                      </td>
                      <td className="px-3 py-2 align-top">
                        <select
                          name="salary"
                          value={emp.salary}
                          onChange={(e) => handleRowChange(index, e)}
                          className="w-24 rounded-lg border border-slate-300 bg-slate-50 px-2 py-1 text-xs"
                          required
                        >
                          <option value="">Select...</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </td>
                      <td className="px-3 py-2 align-top">
                        {employees.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEmployeeRow(index)}
                            className="text-[11px] text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2.5 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Predicting for Department..." : "Run Department Prediction"}
              </button>
            </div>
          </form>

          {/* RESULTS */}
          {summary && (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <h3 className="text-sm font-semibold text-slate-800 mb-2">
                  Summary
                </h3>
                {summary.error ? (
                  <p className="text-xs text-red-500">{summary.error}</p>
                ) : (
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>
                      Total employees:{" "}
                      <span className="font-semibold text-slate-900">
                        {summary.total_employees}
                      </span>
                    </li>
                    <li>
                      Will stay:{" "}
                      <span className="font-semibold text-emerald-700">
                        {summary.will_stay}
                      </span>
                    </li>
                    <li>
                      Will leave:{" "}
                      <span className="font-semibold text-red-600">
                        {summary.will_leave}
                      </span>
                    </li>
                    <li>
                      Attrition rate:{" "}
                      <span className="font-semibold text-blue-700">
                        {summary.attrition_rate_percent}%
                      </span>
                    </li>
                  </ul>
                )}
              </div>

              {predictions.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">
                    Predictions per Employee
                  </h3>
                  <ul className="text-xs text-slate-600 space-y-1 max-h-52 overflow-y-auto">
                    {predictions.map((pred, index) => (
                      <li key={index}>
                        <span className="font-semibold text-slate-700">
                          Employee {index + 1}:
                        </span>{" "}
                        <span
                          className={
                            pred.includes("leave")
                              ? "text-red-600 font-semibold"
                              : "text-emerald-700 font-semibold"
                          }
                        >
                          {pred}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Department;
