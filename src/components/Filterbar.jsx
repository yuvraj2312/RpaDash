import React, { useState } from "react";

const FilterBar = ({ setFilters, fetchData }) => {
  const [formData, setFormData] = useState({
    nltName: "",
    domain: "",
    process: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    setFilters(formData);
    fetchData();
  };

  return (
    <div className="grid grid-cols-6 gap-4 mb-4">
      <input name="nltName" placeholder="NLT Name" onChange={handleChange} className="p-2 border rounded" />
      <input name="domain" placeholder="Domain Name" onChange={handleChange} className="p-2 border rounded" />
      <input name="process" placeholder="Process Name" onChange={handleChange} className="p-2 border rounded" />
      <select name="status" onChange={handleChange} className="p-2 border rounded">
        <option value="">Status</option>
        <option value="Success">Success</option>
        <option value="Failed">Failed</option>
      </select>
      <input type="date" name="startDate" onChange={handleChange} className="p-2 border rounded" />
      <input type="date" name="endDate" onChange={handleChange} className="p-2 border rounded" />
      <div className="col-start-6 flex justify-end">
        <button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white px-14 py-2 rounded transition"> Search </button>
      </div>
    </div>
  );
};

export default FilterBar;