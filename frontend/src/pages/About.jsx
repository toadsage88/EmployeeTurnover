import React from "react";

function About() {
  return (
    <section className="bg-white min-h-[calc(100vh-64px)]">
      <div className="max-w-5xl mx-auto px-4 py-10 lg:py-14">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          About Employee Churn Portal
        </h2>
        <p className="text-slate-600 mb-4">
          Employee Churn Portal is a machine-learning powered web application
          designed to help organizations understand and predict employee
          turnover. By analyzing multiple HR factors such as satisfaction, work
          hours, evaluations, and salary, the system estimates whether an
          employee is likely to stay or leave the organization.
        </p>
        <p className="text-slate-600 mb-4">
          The project uses a trained classification model exposed via a Flask
          REST API. The frontend is built with React and styled using modern
          UI patterns to provide a clean and intuitive experience for HR
          managers and decision makers.
        </p>

        <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-2">
          Key Features
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          <li>Interactive prediction dashboard for individual employees.</li>
          <li>AI-based risk estimation of employee churn.</li>
          <li>Responsive web interface that works across devices.</li>
          <li>Clear separation of frontend and backend for scalability.</li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-2">
          Technologies Used
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>Python, Flask, scikit-learn (Machine Learning & API)</li>
          <li>React, Vite (Frontend framework & tooling)</li>
          <li>Tailwind-style utility classes for styling</li>
          <li>Render (backend hosting) and Vercel (frontend hosting)</li>
        </ul>
      </div>
    </section>
  );
}

export default About;
