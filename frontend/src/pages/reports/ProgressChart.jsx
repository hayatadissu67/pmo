import React from 'react';

export default function ProgressChart({ 
  title = "Aggregate Execution Progress", 
  percentage = 75,
  barColor = "bg-blue-600"
}) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-slate-700">{title}</span>
        <span className="font-bold text-blue-600 font-mono">{percentage}% Completed</span>
      </div>

      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}