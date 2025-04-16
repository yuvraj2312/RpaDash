import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import FilterBar from "../components/Filterbar";
// import Chart from "../components/Chart";
import EnhancedChart from "../components/EnhancedChart";
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
  const [visibleColumns, setVisibleColumns] = useState(allColumns.map((col) => col.key));
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(dummyTableData.length / rowsPerPage);
  const currentData = dummyTableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const toggleColumn = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <Header />
        <div className="p-4 space-y-6">
          <FilterBar setFilters={() => {}} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EnhancedChart title={`Today's Trend`} data={todayData} xAxisKey="hour" />
            <EnhancedChart title="Monthly Overview" data={monthlyData} xAxisKey="month" />
          </div>


          <div className="bg-white p-4 rounded shadow">
            <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    let text = visibleColumns
                      .map((key) => allColumns.find((col) => col.key === key).label)
                      .join("\t") + "\n";
                    currentData.forEach((row) => {
                      text += visibleColumns
                        .map((key) => {
                          if (key === "startTime" || key === "endTime") {
                            return `${row.date} ${row[key]}`;
                          }
                          return row[key];
                        })
                        .join("\t") + "\n";
                    });
                    navigator.clipboard.writeText(text).then(() => alert("Copied!"));
                  }}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                >
                  Copy
                </button>

                <CSVLink
                  data={dummyTableData.map((row) => {
                    const newRow = {};
                    visibleColumns.forEach((key) => {
                      newRow[key] =
                        key === "startTime" || key === "endTime"
                          ? `${row.date} ${row[key]}`
                          : row[key];
                    });
                    return newRow;
                  })}
                  filename="dashboard_data.csv"
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                  CSV
                </CSVLink>

                <button
                  onClick={async () => {
                    const XLSX = await import("xlsx");
                    const ws = XLSX.utils.json_to_sheet(
                      currentData.map((row) => {
                        const newRow = {};
                        visibleColumns.forEach((key) => {
                          newRow[key] =
                            key === "startTime" || key === "endTime"
                              ? `${row.date} ${row[key]}`
                              : row[key];
                        });
                        return newRow;
                      })
                    );
                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, "Dashboard Data");
                    XLSX.writeFile(wb, "dashboard_data.xlsx");
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                >
                  Excel
                </button>

                <button
                  onClick={async () => {
                    const jsPDF = (await import("jspdf")).default;
                    const autoTable = (await import("jspdf-autotable")).default;
                    const doc = new jsPDF();
                    const headers = visibleColumns.map((key) =>
                      allColumns.find((col) => col.key === key).label
                    );
                    const body = currentData.map((row) =>
                      visibleColumns.map((key) =>
                        key === "startTime" || key === "endTime"
                          ? `${row.date} ${row[key]}`
                          : row[key]
                      )
                    );
                    autoTable(doc, {
                      head: [headers],
                      body,
                    });
                    doc.save("dashboard_data.pdf");
                  }}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                >
                  PDF
                </button>
              </div>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm flex items-center"
                >
                  Column Visibility
                  <span
                    className={`ml-2 transform transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 bg-white border mt-1 shadow rounded z-10 max-h-60 overflow-y-auto w-48">
                    {allColumns
                      .filter((col) => col.key !== "date")
                      .map((col) => (
                        <label
                          key={col.key}
                          className="block px-4 py-1 text-sm hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                        >
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
                )}
              </div>
            </div>

            <div className="overflow-auto">
              <table className="min-w-full text-sm border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    {allColumns
                      .filter((col) => col.key !== "date" && visibleColumns.includes(col.key))
                      .map((col) => (
                        <th key={col.key} className="px-2 py-2 border border-gray-300 text-left">
                          {col.label}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((row, i) => (
                    <tr key={i} className="even:bg-gray-50">
                      {allColumns
                        .filter((col) => col.key !== "date" && visibleColumns.includes(col.key))
                        .map((col) => (
                          <td key={col.key} className="px-2 py-2 border border-gray-300">
                            {(col.key === "startTime" || col.key === "endTime")
                              ? `${row.date} ${row[col.key]}`
                              : row[col.key]}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-center items-center gap-2 text-sm flex-wrap">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-1 rounded ${
                    num === currentPage ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {num}
                </button>
              ))}
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




