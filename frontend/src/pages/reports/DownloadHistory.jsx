import React from 'react';

export default function DownloadHistory() {
  const downloads = [
    { file: 'Status_W28_ControlTower.pdf', date: 'Jul 26, 2026' },
    { file: 'Risk_Audit_Q2.xlsx', date: 'Jul 24, 2026' }
  ];

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
      <h4 className="font-bold text-gray-800 text-sm mb-3">Download History</h4>
      <div className="divide-y divide-gray-100 text-xs">
        {downloads.map((d, i) => (
          <div key={i} className="py-2 flex justify-between">
            <span className="font-medium text-gray-700">{d.file}</span>
            <span className="text-gray-400">{d.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}