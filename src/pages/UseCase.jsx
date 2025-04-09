import React from "react";
import Sidebar from "../components/Sidebar"; // adjust path if needed
import Header from "../components/Header";   // make sure this exists

const UseCase = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main section */}
      <div className="flex-1 flex flex-col">
        {/* Header on top */}
        <Header />

        {/* Content area */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-8">
          <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-xl w-full">
            <h1 className="text-3xl font-bold text-blue-800 mb-4">Usecase Analytics</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCase;
