import React from 'react';

export default function DoughnutChart({ title = "Status Breakdown", centerText = "24", subText = "Total", data = [] }) {
  const chartData = data.length ? data : [
    { label: 'On Track', value: 14, color: '#10B981' },
    { label: 'At Risk', value: 7, color: '#F59E0B' },
    { label: 'Critical', value: 3, color: '#EF4444' },
  ];

  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);
  let cumulativePercent = 0;

  const slices = chartData.map((item) => {
    const startPercent = cumulativePercent;
    const itemPercent = (item.value / total) * 100;
    cumulativePercent += itemPercent;
    return `${item.color} ${startPercent}% ${cumulativePercent}%`;
  }).join(', ');

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
      <h3 className="text-sm font-bold text-slate-800 mb-2">{title}</h3>

      <div className="flex items-center justify-center my-4 relative">
        <div 
          className="w-32 h-32 rounded-full flex items-center justify-center"
          style={{ background: `conic-gradient(${slices})` }}
        >
          {/* Inner Donut Hole */}
          <div className="w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-xl font-bold text-slate-800 leading-tight">{centerText}</span>
            <span className="text-[10px] text-slate-400 font-medium uppercase">{subText}</span>
          </div>
        </div>
      </div>

      <div className="space-y-1.5 text-xs">
        {chartData.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
              {item.label}
            </span>
            <span className="font-semibold text-slate-700">({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
}