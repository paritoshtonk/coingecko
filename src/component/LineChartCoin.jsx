import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const LineChartCoin = ({ data }) => {
  if (data == null) return <div>Loading</div>;
  function DateFormatter(value) {
    const date = new Date(value);
    return (
      date.getDate() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      (date.getFullYear() % 100)
    );
  }
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <XAxis
          dataKey="Date"
          name="Date"
          label={{ value: "Date", position: "inside center", dy: 13 }}
          tickFormatter={DateFormatter}
        />
        <YAxis
          dataKey="Price"
          name="Price"
          label={{
            value: "Price",
            angle: -90,
            position: "insideLeft",
            dx: -10,
          }}
          type="number"
        />
        <Area dataKey="Price" fill="#b5b5b5" stroke="#000000" />
        <Tooltip labelFormatter={(value) => "Date: " + DateFormatter(value)} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChartCoin;
