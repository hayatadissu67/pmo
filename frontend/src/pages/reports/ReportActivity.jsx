import React from 'react';

export default function ReportActivity() {
  const logs = [
    { user: 'PMO Admin', action: 'Approved Status W28', time: '10 mins ago' },
    { user: 'Lead Architect', action: 'Generated Risk Summary', time: '1 hour ago' }
  ];

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-800 text-lg mb-3">Activity Audit Trail</h3>
      <div className="space-y-2 text-xs text-gray-600">
        {logs.map((l, i) => (
          <div key={i} className="flex justify-between border-b border-gray-100 pb-1.5">
            <span><strong className="text-gray-800">{l.user}</strong>: {l.action}</span>
            <span className="text-gray-400">{l.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}