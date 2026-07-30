import React from 'react';

export default function ReportPreview({ config = {}, onConfirmDownload }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-blue-600 font-bold">Document Preview</span>
          <h2 className="text-xl font-bold text-gray-800">PMO Status & Performance Summary</h2>
        </div>
        <button
          onClick={onConfirmDownload}
          className="px-4 py-2 bg-green-600 text-white text-xs font-semibold rounded hover:bg-green-700 transition"
        >
          Confirm & Export
        </button>
      </div>

      {/* Mock Document Sheet */}
      <div className="bg-gray-50 border p-6 rounded shadow-inner space-y-4 font-sans max-h-[350px] overflow-y-auto">
        <div className="border-b pb-3 flex justify-between items-start">
          <div>
            <h1 className="text-lg font-bold text-gray-900">PMO Control Tower</h1>
            <p className="text-xs text-gray-500">Date Generated: {new Date().toLocaleDateString()}</p>
          </div>
          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">PREVIEW ONLY</span>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase text-gray-600">Executive Summary</h4>
          <p className="text-xs text-gray-700 leading-relaxed">
            This generated report consolidates milestone performance metrics, document approvals, and system audit logs across selected portfolio tracks for the designated date range.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 py-2">
          <div className="p-2 bg-white border rounded text-center">
            <span className="block text-xs text-gray-400">Total Milestones</span>
            <span className="text-base font-bold text-gray-800">24</span>
          </div>
          <div className="p-2 bg-white border rounded text-center">
            <span className="block text-xs text-gray-400">Completion Rate</span>
            <span className="text-base font-bold text-green-600">88%</span>
          </div>
          <div className="p-2 bg-white border rounded text-center">
            <span className="block text-xs text-gray-400">Pending Reviews</span>
            <span className="text-base font-bold text-yellow-600">3</span>
          </div>
        </div>
      </div>
    </div>
  );
}