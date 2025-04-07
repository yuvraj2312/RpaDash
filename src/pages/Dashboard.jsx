import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import FilterBar from "../components/Filterbar";
import Chart from "../components/Chart";

// Step 1: Add dummy data
const dummyData = [
  { month: "Jan", "Volume Processed": 120, Success: 100, Failed: 20 },
  { month: "Feb", "Volume Processed": 150, Success: 130, Failed: 20 },
  { month: "Mar", "Volume Processed": 180, Success: 160, Failed: 20 },
];

function Dashboard() {
  const [filters, setFilters] = useState({});
  const [chartData, setChartData] = useState([]);

  // Step 2: Use dummy data instead of API
  useEffect(() => {
    setChartData(dummyData);
  }, []);

  const fetchData = () => {
    setChartData(dummyData); // trigger on filter search too
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="p-4">
          <FilterBar setFilters={setFilters} fetchData={fetchData} />
          <Chart data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
