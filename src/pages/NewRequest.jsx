import React, {useState} from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header"; // Optional

const InputField = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="mb-1 font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
    />
  </div>
);

const SelectField = ({ label, options, placeholder, ...props }) => (
  <div className="flex flex-col">
    <label className="mb-1 font-medium text-gray-700">{label}</label>
    <select
      {...props}
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const NewRequest = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Header />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-blue-900">
            Automation Request Form
          </h1>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md">
            <InputField label="OLM ID *" type="text" placeholder="Enter OLM ID" />
            
            <SelectField
              label="Priority *"
              placeholder="Select Priority"
              options={["P1", "P2", "P3", "P4"]}
            />

            <InputField label="Use Case *" type="text" placeholder="Enter Use Case" />
            <InputField label="Use Case Description *" type="text" placeholder="Enter Description" />

            <SelectField
              label="Current Volume *"
              placeholder="Select Type"
              options={[
                "Reports",
                "Transactions",
                "Incidents",
                "Nodes",
                "Services",
                "Orders",
                "Others",
              ]}
            />
            <InputField label="Volume *" type="number" placeholder="Enter Volume" />

            <SelectField
              label="Activity to be performed in a year *"
              placeholder="Select Frequency"
              options={[
                "Daily (365)",
                "Weekly (52)",
                "Monthly (12)",
                "Adhoc / Trigger Based",
              ]}
            />

            {/* Circles Involved */}
            <div className="flex flex-col gap-2">
              <label className="mb-1 font-medium text-gray-700">Circles Involved</label>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Enter Circle Number"
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Enter Circle Name"
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <InputField
              label="Time Required to Perform the Activity *"
              type="text"
              placeholder="e.g., 3 hours"
            />
            <InputField label="SLA Expected *" type="text" placeholder="e.g., 24 hours" />

            {/* Human Efforts */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="mb-1 font-medium text-gray-700">Human Efforts (FTE)</label>
              
              {/* Row 1 */}
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="number"
                  placeholder="Number of Assistant Managers"
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Number of Associate Managers"
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Row 2 */}
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="number"
                  placeholder="Number of Team Leads"
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Number of Senior Staff"
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>


            <InputField label="OEM / Domain *" type="text" placeholder="Enter Domain" />
            <InputField label="System / Tools *" type="text" placeholder="Enter Tools or System" />

            <SelectField
              label="Activity Performed By *"
              placeholder="Select Performer"
              options={["Airtel", "Partner"]}
            />

            <InputField label="KPI Indicators / Benefits *" type="text" placeholder="Enter KPI Indicators" />

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition shadow"
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
