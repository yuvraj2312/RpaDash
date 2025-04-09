import React from "react";
import { FaChartBar, FaPlus, FaRocket, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optionally clear auth/session here
    navigate("/login");
  };

  return (
    <div className="w-64 bg-blue-900 text-white flex flex-col justify-between p-4 min-h-screen">
      <div>
        <div className="text-2xl font-bold mb-10 tracking-wide">
          INTELLIGENT AUTOMATION
        </div>
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
