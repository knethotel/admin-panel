'use client';
import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

type PieChartProps = {
  value1: number;
  value2: number;
  value3: number;
};

const COLORS = ['#78B150', '#FE9900', '#3787E3']; // Three different colors

const CustomPieChart = ({ value1, value2, value3 }: PieChartProps) => {
  const total = value1 + value2 + value3;
  const data = [
    { name: 'Section 1', value: value1 },
    { name: 'Section 2', value: value2 },
    { name: 'Section 3', value: value3 }
  ];

  return (
    <div className="flex items-center justify-center relative">
      <PieChart width={200} height={200} className="">
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60} // Creates the ring shape
          outerRadius={80}
          dataKey="value"
          stroke="none" // Removes extra stroke borders
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
      <div className="absolute text-center w-16 h-16 flex items-center justify-center bg-white shadow-inner rounded-full font-bold text-lg">
        {total}
      </div>
    </div>
  );
};

export default CustomPieChart;
