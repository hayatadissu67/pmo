import React from 'react';

export default function BarChart({ title = "Bar Comparison", data = [] }) {
  const chartData = data.length ? data : [
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 85 },
    { label: 'Mar', value: 45 },
    { label: 'Apr', value: 90 },
    { label: 'May', value: 75 },
  ];

  const maxValue = Math.max(...chartData.map((d) => d.value), 100);

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800 mb-4">{title}</h3>

      <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-100">
        {chartData.map((item, idx) => {
          const heightPercent = (item.value / maxValue) * 100;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
              <div className="text-[10px] text-slate-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                {item.value}
              </div>
              <div
                className="w-full bg-blue-600 rounded-t-sm transition-all duration-300 hover:bg-blue-700"
                style={{ height: `${heightPercent}%` }}
              />
              <span className="text-[10px] text-slate-400 font-medium mt-2">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}