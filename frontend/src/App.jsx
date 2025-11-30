import React from "react";
import {
  HashRouter as Router,   // ⬅️ changed from BrowserRouter
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

function Layout() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const isLoggedIn = !!localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* NAVBAR */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl">👥</span>
            <span>Employee Churn Portal</span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "underline underline-offset-4" : "hover:opacity-80"
              }
              end
            >
              Home
            </NavLink>

            {isLoggedIn && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-4"
                    : "hover:opacity-80"
                }
              >
                Dashboard
              </NavLink>
            )}

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "underline underline-offset-4" : "hover:opacity-80"
              }
            >
              About
            </NavLink>

            {!isLoggedIn ? (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "underline underline-offset-4" : "hover:opacity-80"
                }
              >
                Login
              </NavLink>
            ) : (
              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs"
              >
                Logout {username && `(${username})`}
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* ROUTES */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

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

export default App;
