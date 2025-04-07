import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <input
        type="text"
        placeholder="Search"
        className="border px-4 py-2 rounded-md w-1/3"
      />
      <div className="flex items-center gap-4">
        <FaBell className="text-xl" />
        <FaUserCircle className="text-2xl" />
      </div>
    </header>
  );
};

export default Header;