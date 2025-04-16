import React, { useState } from "react";
import {
  FaChartBar,
  FaPlus,
  FaRocket,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AirtelLogo from "../assets/airtel-logo.png";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-blue-900 text-white flex flex-col justify-between p-4 min-h-screen transition-all duration-500 ease-in-out overflow-hidden`}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      {/* Logo and Title */}
      <div>
        <div className="flex items-center gap-3 mb-10 transition-all duration-500 ease-in-out">
          <img
            src={AirtelLogo}
            alt="Airtel Logo"
            className={`object-contain transition-all duration-500 ease-in-out ${
              isCollapsed ? "h-20 w-20" : "h-14 w-14"
            }`}
          />
          <span
            className={`text-xl font-bold tracking-wide leading-tight transition-all duration-500 ease-in-out ${
              isCollapsed ? "opacity-0 scale-95 hidden" : "opacity-100 scale-100 block"
            }`}
          >
            INTELLIGENT <br /> AUTOMATION
          </span>
        </div>

        {/* Navigation */}
        <nav
          className={`transition-all duration-500 ease-in-out ${
            isCollapsed ? "space-y-8" : "space-y-6"
          } text-lg`}
        >
          {[
            { to: "/", icon: <FaChartBar />, label: "Statistics" },
            { to: "/new-request", icon: <FaPlus />, label: "New Request" },
            { to: "/adhoc-trigger", icon: <FaRocket />, label: "AD-HOC Trigger" },
            { to: "/live", icon: <FaChartLine />, label: "Live" },
            { to: "/usecase-analytics", icon: <FaChartLine />, label: "Usecase Analytics" },
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "gap-3"
              } hover:text-blue-300 transition-all duration-300 ease-in-out`}
            >
              <div className="text-2xl">{item.icon}</div>
              <span
                className={`whitespace-nowrap transition-all duration-500 ease-in-out ${
                  isCollapsed ? "opacity-0 scale-95 hidden" : "opacity-100 scale-100 block"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div
        onClick={handleLogout}
        className={`flex items-center text-lg text-stone-300 hover:text-red-300 transition-all duration-300 ease-in-out cursor-pointer ${
          isCollapsed ? "justify-center mt-8" : "gap-3"
        }`}
      >
        <FaSignOutAlt className="text-2xl" />
        <span
          className={`transition-all duration-500 ease-in-out ${
            isCollapsed ? "opacity-0 scale-95 hidden" : "opacity-100 scale-100 block"
          }`}
        >
          Logout
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
