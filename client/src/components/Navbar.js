import React from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle"; // optional, if you use dark mode toggle

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="w-full px-6 py-4 bg-white dark:bg-gray-800 shadow flex justify-between items-center">
      <h1
        className="text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
         📋 Job Tracker
      </h1>

      <div className="flex items-center space-x-4">
        {/* Optional: Toggle for dark mode */}
        <ThemeToggle />

        <button
          onClick={handleLogout}
          className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
