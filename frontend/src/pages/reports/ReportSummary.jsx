import React from 'react';

export default function ReportSummary() {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-800 text-lg mb-2">Executive Highlights</h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-3">
        Overall portfolio trajectory remains on schedule. Deliverables for Sprint 4 met target timelines with minimal risks.
      </p>
      <div className="p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800 font-medium">
        💡 2 Status reports pending approval before fiscal week close.
      </div>
    </div>
  );
}