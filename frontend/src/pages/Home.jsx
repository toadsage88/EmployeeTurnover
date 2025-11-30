// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const scrollToFeatures = () => {
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-sky-50 to-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm font-semibold text-blue-600 mb-2">
              AI-Powered HR Analytics
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-snug mb-4">
              Employee Turnover Prediction{" "}
              <span className="text-blue-600">AI-Powered Insights</span>
            </h1>
            <p className="text-slate-600 mb-6">
              Transform your HR decisions with our advanced machine learning
              solution that predicts employee churn with high accuracy and helps
              you take proactive retention measures.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
              >
                Try Prediction
              </Link>
              <button
                onClick={scrollToFeatures}
                className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-800 font-semibold bg-white hover:bg-slate-50 transition"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Illustration placeholder */}
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
      <section id="features" className="bg-white">
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
    </>
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

export default Home;


