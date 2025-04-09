import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef();

  const getPageTitle = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("new-request")) return "NEW REQUEST";
    if (path.includes("adhoc-trigger")) return "ADHOC TRIGGER";
    if (path.includes("live")) return "LIVE";
    if (path.includes("usecase-analytics")) return "USECASE ANALYTICS";
    return "STATISTICS";
  };

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left Section: Date and Page Title */}
      <div className="flex items-center gap-10">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-800 tracking-wide">
          {getPageTitle()}
        </h1>

        {/* Date */}
        <div className="text-gray-600 text-base font-medium">{today}</div>
      </div>


      {/* Icons */}
      <div className="relative flex items-center gap-4" ref={profileRef}>
        {/* Notification */}
        <button
          className="relative hover:text-blue-600 transition-colors"
          title="Notifications"
        >
          <FaBell className="text-xl text-gray-600" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-[1px] rounded-full">
            3
          </span>
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="hover:text-blue-600 transition-colors"
            title="User Profile"
          >
            <FaUserCircle className="text-2xl text-gray-600" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-md p-4 z-50 animate-fade-in">
              <h2 className="text-sm font-semibold text-gray-800 mb-3">
                User Profile
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                <div>
                  <span className="font-medium">OLM ID:</span> ABC123
                </div>
                <div>
                  <span className="font-medium">Name:</span> Yuvraj Arora
                </div>
                <div>
                  <span className="font-medium">Email:</span> abc123@airtel.com
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
