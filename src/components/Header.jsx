import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
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
        <h1 className="text-2xl font-semibold text-[#E40046] tracking-wide">
          {getPageTitle()}
        </h1>

        {/* Date */}
        <div className="text-gray-500 text-base font-medium">{today}</div>
      </div>

      {/* Icons */}
      <div className="relative flex items-center gap-4" ref={profileRef}>
        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="hover:text-[#E40046] transition-colors duration-300"
            title="User Profile"
          >
            <FaUserCircle className="text-2xl text-gray-600 hover:text-[#E40046] transition-colors duration-300" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 shadow-xl rounded-lg p-4 z-50 animate-fade-in transition-opacity duration-300">
              <h2 className="text-sm font-semibold text-[#E40046] mb-3">
                User Profile
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                <div>
                  <span className="font-medium text-gray-600">OLM ID:</span> ABC123
                </div>
                <div>
                  <span className="font-medium text-gray-600">Name:</span> Yuvraj Arora
                </div>
                <div>
                  <span className="font-medium text-gray-600">Email:</span> abc123@airtel.com
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
