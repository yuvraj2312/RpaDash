import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // Get dynamic page title based on current path
  const getPageTitle = () => {
    const path = location.pathname.toLowerCase();

    if (path.includes("new-request")) return "NEW REQUEST";
    if (path.includes("adhoc-trigger")) return "ADHOC TRIGGER";
    if (path.includes("live")) return "LIVE";
    if (path.includes("usecase-analytics")) return "USECASE ANALYTICS";

    return "STATISTICS";
  };

  // Get formatted date string
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle()}</h1>

      {/* Today's Date */}
      <span className="text-gray-600 text-sm font-medium">{today}</span>

      {/* Icons */}
      <div className="flex items-center gap-4">
        <button className="relative">
          <FaBell className="text-xl text-gray-600 hover:text-blue-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-[1px] rounded-full">
            3
          </span>
        </button>
        <FaUserCircle className="text-2xl text-gray-600 hover:text-blue-600 cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
