import React from 'react';

export default function ViewReport({ report }) {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm min-h-[220px]">
      <h3 className="font-bold text-gray-800 text-lg mb-3">Report Previewer</h3>
      {report ? (
        <div className="p-4 bg-gray-50 rounded border border-gray-200 space-y-3 text-sm">
          <div className="border-b border-gray-200 pb-2">
            <h4 className="font-bold text-gray-900">{report.title}</h4>
            <p className="text-xs text-gray-500">Project: {report.project} | Author: {report.author}</p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            This document summarizes weekly KPIs, risks, and upcoming deliverables for <strong>{report.project}</strong>.
          </p>
          <div className="flex gap-2 pt-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded font-medium transition-colors">
              Export PDF
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs px-3 py-1.5 rounded font-medium transition-colors">
              Print
            </button>
          </div>
        </div>
      ) : (
        <div className="h-32 flex items-center justify-center border border-dashed border-gray-300 rounded text-gray-400 text-sm">
          Select a report to view content
        </div>
      )}
    </div>
  );
}