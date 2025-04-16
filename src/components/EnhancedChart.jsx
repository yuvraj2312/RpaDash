import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const EnhancedChart = ({ data, title, xAxisKey = "month" }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full mt-6">
      {title && <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>}
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey={xAxisKey} tick={{ fill: "#6b7280", fontSize: 12 }} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
            labelStyle={{ color: "#374151", fontWeight: "600" }}
            itemStyle={{ color: "#4b5563" }}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: "#6b7280" }} />

          {/* Stacked Bars */}
          <Bar dataKey="Success" stackId="volume" fill="#10B981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Failed" stackId="volume" fill="#EF4444" radius={[4, 4, 0, 0]} />

          {/* Total Volume Line */}
          <Line
            type="monotone"
            dataKey="Volume Processed"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnhancedChart;
