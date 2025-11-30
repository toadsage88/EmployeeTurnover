import React from "react";

export default function About() {
  return (
    <div className="text-center mt-10 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">About This Project</h2>
      <p className="text-gray-700">
        This project was developed by <b>Himanshu Vyas</b> as a final-year Computer Science project.
        It integrates AI/ML with Web Development to predict employee churn.
        The ML model is built with Python and scikit-learn, and the frontend uses React + Tailwind CSS.
      </p>
    </div>
  );
}
