import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import FilterBar from "../components/Filterbar";
import Chart from "../components/Chart";
import { CSVLink } from "react-csv";

// Dummy data
const todayData = [
  { hour: "08:00", "Volume Processed": 30, Success: 25, Failed: 5 },
  { hour: "10:00", "Volume Processed": 40, Success: 38, Failed: 2 },
  { hour: "12:00", "Volume Processed": 35, Success: 30, Failed: 5 },
  { hour: "14:00", "Volume Processed": 50, Success: 45, Failed: 5 },
];

const monthlyData = [
  { month: "Jan", "Volume Processed": 120, Success: 100, Failed: 20 },
  { month: "Feb", "Volume Processed": 150, Success: 130, Failed: 20 },
  { month: "Mar", "Volume Processed": 180, Success: 160, Failed: 20 },
];

const dummyTableData = Array.from({ length: 20 }, (_, i) => ({
  sno: i + 1,
  processName: `Process ${i + 1}`,
  processOwner: `Owner ${i + 1}`,
  jiraId: `JIRA-${1000 + i}`,
  date: "2024-04-09",
  processType: i % 2 === 0 ? "Daily" : "Ad-hoc",
  status: i % 3 === 0 ? "Failed" : "Success",
  volume: 100 + i,
  successVolume: 95 + i,
  failedVolume: 5,
  startTime: "09:00",
  endTime: "09:30",
  duration: "30 mins",
  output: "Success",
}));

const allColumns = [
  { key: "sno", label: "S No." },
  { key: "processName", label: "Process Name" },
  { key: "processOwner", label: "Process Owner" },
  { key: "jiraId", label: "Jira ID" },
  { key: "date", label: "Date" },
  { key: "processType", label: "Process Type" },
  { key: "status", label: "Status" },
  { key: "volume", label: "Volume Processed" },
  { key: "successVolume", label: "Success Volume" },
  { key: "failedVolume", label: "Failed Volume" },
  { key: "startTime", label: "Start Time" },
  { key: "endTime", label: "End Time" },
  { key: "duration", label: "Duration" },
  { key: "output", label: "Output" },
];

function Dashboard() {
  const [filters, setFilters] = useState({});
  const [visibleColumns, setVisibleColumns] = useState(
    allColumns.map((col) => col.key)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const toggleColumn = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const fetchData = () => {
    // Static for now
  };

  const totalPages = Math.ceil(dummyTableData.length / rowsPerPage);
  const currentData = dummyTableData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const today = new Date();
  const todayString = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <Header />
        <div className="p-4 space-y-6">
          <FilterBar setFilters={setFilters} fetchData={fetchData} />

          {/* Charts section */}
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
            <Chart title={`Today's Trend : ${todayString}`} data={todayData} xAxisKey="hour" />
            <Chart title="Monthly Overview" data={monthlyData} xAxisKey="month" />
          </div>

          {/* Table section */}
          <div className="bg-white p-4 rounded shadow">
            <div className="mb-4 flex justify-between items-center flex-wrap gap-2">
              <div className="flex flex-wrap gap-2">
                {allColumns.map((col) => (
                  <label key={col.key} className="text-sm">
                    <input
                      type="checkbox"
                      checked={visibleColumns.includes(col.key)}
                      onChange={() => toggleColumn(col.key)}
                      className="mr-1"
                    />
                    {col.label}
                  </label>
                ))}
              </div>

              <div className="flex gap-2">
                <CSVLink
                  data={dummyTableData}
                  filename={"dashboard_data.csv"}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                  Export CSV
                </CSVLink>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-auto">
              <table className="min-w-full text-sm border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    {allColumns
                      .filter((col) => visibleColumns.includes(col.key))
                      .map((col) => (
                        <th
                          key={col.key}
                          className="px-2 py-2 border border-gray-300 text-left"
                        >
                          {col.label}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((row, i) => (
                    <tr key={i} className="even:bg-gray-50">
                      {allColumns
                        .filter((col) => visibleColumns.includes(col.key))
                        .map((col) => (
                          <td
                            key={col.key}
                            className="px-2 py-2 border border-gray-300"
                          >
                            {row[col.key]}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-end items-center gap-2 text-sm">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
