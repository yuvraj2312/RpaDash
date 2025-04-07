import React from "react";
import Sidebar from "../components/Sidebar";

const AdhocTrigger = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-blue-900">Project Dashboard</h1>
      </div>
    </div>
  );
};

export default AdhocTrigger;
