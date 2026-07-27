import React from 'react';

export default function ReportDetails({ report }) {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm min-h-[220px]">
      <h3 className="font-bold text-gray-800 text-lg mb-3">Report Details</h3>
      {report ? (
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong className="text-gray-800">ID:</strong> REP-00{report.id}</p>
          <p><strong className="text-gray-800">Date Created:</strong> {report.date}</p>
          <p><strong className="text-gray-800">Status:</strong> {report.status}</p>
          <p><strong className="text-gray-800">Clearance:</strong> Internal PMO</p>
        </div>
      ) : (
        <div className="h-32 flex items-center justify-center border border-dashed border-gray-300 rounded text-gray-400 text-sm">
          No report selected
        </div>
      )}
    </div>
  );
}