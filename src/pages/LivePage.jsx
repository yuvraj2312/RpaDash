import React, { useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const data = [
  {
    process: "Invoice Automation",
    nlt: "NLT001",
    domain: "Finance",
    owner: "John Doe",
    stage: "In Progress",
    goLive: "2024-05-15",
  },
  {
    process: "Email Sorting",
    nlt: "NLT002",
    domain: "Support",
    owner: "Jane Smith",
    stage: "Completed",
    goLive: "2024-04-10",
  },
  {
    process: "Ticket Assignment",
    nlt: "NLT003",
    domain: "IT",
    owner: "Alice Brown",
    stage: "Pending",
    goLive: "2024-06-01",
  },
];

const LivePage = () => {
  const tableRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");

  const handleCopy = () => {
    const text = data.map((row) =>
      Object.values(row).join("\t")
    ).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "LiveData");
    XLSX.writeFile(workbook, "LiveData.xlsx");
  };

  const handleExportCSV = () => {
    const csvRows = [
      ["Process Name", "NLT Name", "Domain", "Process Owner", "Stage", "Go Live Date"],
      ...data.map((row) => [
        row.process,
        row.nlt,
        row.domain,
        row.owner,
        row.stage,
        row.goLive,
      ]),
    ];
    const csvContent = csvRows.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "LiveData.csv";
    a.click();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Process Name", "NLT Name", "Domain", "Process Owner", "Stage", "Go Live Date"]],
      body: data.map((row) => [
        row.process,
        row.nlt,
        row.domain,
        row.owner,
        row.stage,
        row.goLive,
      ]),
    });
    doc.save("LiveData.pdf");
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      val.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-900 mb-4">Live Automations</h1>

          {/* Export Buttons and Search */}
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                  copied ? "bg-blue-600 text-white" : "bg-indigo-500 text-white hover:bg-indigo-600"
                }`}
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <button onClick={handleExportExcel} className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
                Excel
              </button>
              <button onClick={handleExportCSV} className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-600">
                CSV
              </button>
              <button onClick={handleExportPDF} className="bg-rose-400 text-white px-4 py-2 rounded-md hover:bg-rose-500">
                PDF
              </button>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="p-2 border rounded-md w-60"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left" ref={tableRef}>
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="px-6 py-3">Process Name</th>
                  <th className="px-6 py-3">NLT Name</th>
                  <th className="px-6 py-3">Domain</th>
                  <th className="px-6 py-3">Process Owner</th>
                  <th className="px-6 py-3">Automation Stage</th>
                  <th className="px-6 py-3">Go Live Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    <td className="px-6 py-4">{item.process}</td>
                    <td className="px-6 py-4">{item.nlt}</td>
                    <td className="px-6 py-4">{item.domain}</td>
                    <td className="px-6 py-4">{item.owner}</td>
                    <td className="px-6 py-4">{item.stage}</td>
                    <td className="px-6 py-4">{item.goLive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePage;
