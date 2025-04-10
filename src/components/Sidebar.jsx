import React from "react";
import {
  FaChartBar,
  FaPlus,
  FaRocket,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AirtelLogo from "../assets/airtel-logo.png"; // Ensure the correct path & extension

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="w-64 bg-blue-900 text-white flex flex-col justify-between p-4 min-h-screen">
      {/* Logo and Title */}
      <div>
        <div className="flex items-center gap-3 mb-10">
        <img
          src={AirtelLogo}
          alt="Airtel Logo"
          className="h-14 w-14 object-contain transition-transform duration-300 hover:scale-105"
        />

          <span className="text-xl font-bold tracking-wide leading-tight">
            INTELLIGENT <br /> AUTOMATION
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-6 text-lg">
          <Link to="/" className="flex items-center gap-3 hover:text-blue-300 transition">
            <FaChartBar className="text-xl" /> Statistics
          </Link>
          <Link to="/new-request" className="flex items-center gap-3 hover:text-blue-300 transition">
            <FaPlus className="text-xl" /> New Request
          </Link>
          <Link to="/adhoc-trigger" className="flex items-center gap-3 hover:text-blue-300 transition">
            <FaRocket className="text-xl" /> AD-HOC Trigger
          </Link>
          <Link to="/live" className="flex items-center gap-3 hover:text-blue-300 transition">
            <FaChartLine className="text-xl" /> Live
          </Link>
          <Link to="/usecase-analytics" className="flex items-center gap-3 hover:text-blue-300 transition">
            <FaChartLine className="text-xl" /> Usecase Analytics
          </Link>
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 mt-10 text-stone-300 hover:text-red-300 text-lg transition"
      >
        <FaSignOutAlt className="text-xl" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
