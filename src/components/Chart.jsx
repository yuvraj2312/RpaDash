import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const Chart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Volume Processed" stroke="#1D4ED8" />
          <Line type="monotone" dataKey="Success" stroke="#16A34A" />
          <Line type="monotone" dataKey="Failed" stroke="#DC2626" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;