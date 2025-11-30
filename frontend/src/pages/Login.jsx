import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = "https://employee-turnover-backend.onrender.com/login";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(LOGIN_URL, form);
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("username", form.username);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 to-sky-50 min-h-[calc(100vh-64px)] flex items-center">
      <div className="max-w-md mx-auto w-full px-4 py-10">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-center mb-2 text-slate-900">
            Login 
          </h2>
         

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div className="flex flex-col gap-1">
              <label className="text-slate-700 text-xs font-medium">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-slate-700 text-xs font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                required
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 px-4 py-2.5 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
