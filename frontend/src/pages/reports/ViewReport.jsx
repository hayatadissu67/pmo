import React from 'react';

const mockActiveReport = {
  id: 'REP-001',
  title: 'Q2 Financial Summary',
  author: 'Abebe Kebede',
  publishedDate: '2026-07-28',
  content: 'This report details the Q2 system expenditures, budget allocation, and infrastructure operations performance.',
  fileUrl: '#'
};

export default function ViewReport({ report = mockActiveReport, onBack }) {
  // Guard against null/undefined state passed from parent
  if (!report) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center py-10">
        <p className="text-gray-500 mb-4">No report selected.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
        >
          ← Back to Reports
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <button
            onClick={onBack}
            className="text-sm text-blue-600 hover:underline mb-2 block"
          >
            ← Back to Reports
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{report.title}</h1>
          <p className="text-xs text-gray-500 mt-1">
            Authored by <span className="font-medium text-gray-700">{report.author || 'Unknown'}</span> • {report.publishedDate}
          </p>
        </div>
        {report.fileUrl && (
          <a
            href={report.fileUrl}
            download
            className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
          >
            Download Document
          </a>
        )}
      </div>

      <div className="bg-gray-50 p-4 border rounded-md min-h-[200px]">
        <h3 className="text-sm font-semibold text-gray-500 mb-2">Report Content Preview</h3>
        <p className="text-gray-700 leading-relaxed">{report.content || 'No content available for this report.'}</p>
      </div>
    </div>
  );
}