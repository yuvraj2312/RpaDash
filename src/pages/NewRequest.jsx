import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header"; // Optional - include if you have a Header component

const InputField = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="mb-1 font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
    />
  </div>
);

const NewRequest = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header /> {/* Remove if not using Header */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-blue-900">Automation Request Form</h1>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md">
            <InputField label="Old ID" type="text" placeholder="Enter Old ID" />
            <InputField label="Priority" type="text" placeholder="Enter Priority" />
            <InputField label="Use Case" type="text" placeholder="Describe Use Case" />
            <InputField label="Description" type="text" placeholder="Enter Description" />
            <InputField label="Current Volume" type="number" placeholder="Enter Current Volume" />
            <InputField label="Expected Volume" type="number" placeholder="Enter Expected Volume" />
            <InputField label="Activity" type="text" placeholder="Enter Activity" />
            <InputField label="Circles Involved" type="text" placeholder="List Circles" />
            <InputField label="Time Required" type="text" placeholder="e.g., 3 hours" />
            <InputField label="SLA" type="text" placeholder="e.g., 24 hours" />
            <InputField label="Human Efforts (FTE)" type="text" placeholder="e.g., 1.5 FTE" />
            <InputField label="Domain" type="text" placeholder="Enter Domain" />

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition shadow"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewRequest;
