import React from 'react';

export default function LineChart({ title = "Performance Trend", points = [20, 45, 30, 70, 60, 95] }) {
  const width = 300;
  const height = 140;

  // Convert numerical values to SVG path string
  const max = Math.max(...points, 100);
  const pathPoints = points.map((val, idx) => {
    const x = (idx / (points.length - 1)) * width;
    const y = height - (val / max) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800 mb-2">{title}</h3>

      <div className="w-full h-36 flex items-center justify-center pt-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          {/* Background Grid Line */}
          <line x1="0" y1={height} x2={width} y2={height} stroke="#E2E8F0" strokeWidth="1" />
          
          {/* Trend Line */}
          <polyline
            fill="none"
            stroke="#2563EB"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={pathPoints}
          />

          {/* Data Points Dots */}
          {points.map((val, idx) => {
            const x = (idx / (points.length - 1)) * width;
            const y = height - (val / max) * height;
            return (
              <circle
                key={idx}
                cx={x}
                cy={y}
                r="4"
                className="fill-white stroke-blue-600 stroke-2 hover:r-6 transition-all"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}