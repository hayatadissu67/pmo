import React from 'react';

export default function AreaChart({ title = "Growth Overview", points = [30, 40, 35, 60, 75, 90] }) {
  const width = 300;
  const height = 120;

  const max = Math.max(...points, 100);
  const pathPoints = points.map((val, idx) => {
    const x = (idx / (points.length - 1)) * width;
    const y = height - (val / max) * height;
    return `${x},${y}`;
  }).join(' ');

  // Fill area down to bottom corners
  const areaPoints = `0,${height} ${pathPoints} ${width},${height}`;

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800 mb-2">{title}</h3>

      <div className="w-full h-36 flex items-center justify-center pt-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <polygon points={areaPoints} fill="url(#areaGradient)" />

          {/* Stroke Line */}
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2.5"
            strokeLinecap="round"
            points={pathPoints}
          />
        </svg>
      </div>
    </div>
  );
}