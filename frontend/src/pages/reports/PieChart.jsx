import React from 'react';

export default function PieChart({ title = "Pie Breakdown", data = [] }) {
  // Fallback demo data if none passed
  const chartData = data.length ? data : [
    { label: 'Category A', value: 40, color: '#3B82F6' },
    { label: 'Category B', value: 35, color: '#10B981' },
    { label: 'Category C', value: 25, color: '#F59E0B' },
  ];

  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);
  let cumulativePercent = 0;

  // Generate SVG conic gradient slices
  const slices = chartData.map((item) => {
    const startPercent = cumulativePercent;
    const itemPercent = (item.value / total) * 100;
    cumulativePercent += itemPercent;
    return `${item.color} ${startPercent}% ${cumulativePercent}%`;
  }).join(', ');

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
      <h3 className="text-sm font-bold text-slate-800 mb-3">{title}</h3>

      <div className="flex items-center justify-center my-4">
        <div 
          className="w-32 h-32 rounded-full transition-all duration-300 shadow-inner"
          style={{ background: `conic-gradient(${slices})` }}
        />
      </div>

      <div className="space-y-1.5 text-xs">
        {chartData.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
              {item.label}
            </span>
            <span className="font-semibold text-slate-700">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}