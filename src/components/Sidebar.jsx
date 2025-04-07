import React from "react";
import { FaChartBar, FaPlus, FaRocket, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-900 text-white flex flex-col p-4">
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
      </nav>
    </div>
  );
};

export default Sidebar;
