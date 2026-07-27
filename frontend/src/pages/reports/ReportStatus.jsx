import React from 'react';

export default function ReportStatus() {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-green-500">
      <p className="text-xs font-semibold text-gray-500 uppercase">Workflow Breakdown</p>
      <div className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Published:</span>
          <span className="font-bold text-green-600">110</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">In Review:</span>
          <span className="font-bold text-yellow-600">28</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Drafts:</span>
          <span className="font-bold text-gray-600">10</span>
        </div>
      </div>
    </div>
  );
}