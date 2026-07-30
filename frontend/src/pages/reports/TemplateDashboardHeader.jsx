import React from 'react';

export default function TemplateDashboardHeader({ onQuickAction }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">PMO Document & Template Repository</h1>
          <p className="text-xs text-gray-500 mt-1">
            Standardized project templates across all governance lifecycles.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onQuickAction('upload')}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold shadow-sm"
          >
            + Upload Template
          </button>
          <button
            onClick={() => onQuickAction('browse')}
            className="px-3 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-gray-100">
        <div className="bg-blue-50/50 p-3 rounded-md border border-blue-100">
          <span className="text-xs text-blue-600 font-semibold uppercase">Total Templates</span>
          <p className="text-lg font-bold text-blue-900 mt-0.5">31 Files</p>
        </div>
        <div className="bg-emerald-50/50 p-3 rounded-md border border-emerald-100">
          <span className="text-xs text-emerald-600 font-semibold uppercase">Project Phases</span>
          <p className="text-lg font-bold text-emerald-900 mt-0.5">5 Phases</p>
        </div>
        <div className="bg-purple-50/50 p-3 rounded-md border border-purple-100">
          <span className="text-xs text-purple-600 font-semibold uppercase">Supported Formats</span>
          <p className="text-lg font-bold text-purple-900 mt-0.5">DOCX & XLSX</p>
        </div>
        <div className="bg-amber-50/50 p-3 rounded-md border border-amber-100">
          <span className="text-xs text-amber-600 font-semibold uppercase">Governance Version</span>
          <p className="text-lg font-bold text-amber-900 mt-0.5">v2.0 Standard</p>
        </div>
      </div>
    </div>
  );
}