import React from 'react';

export default function AdminDashboardSidebar({ onAdminAction }) {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-5">
      <div className="border-b pb-2">
        <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Admin Controls</h2>
        <p className="text-xs text-gray-400">Template Governance & Actions</p>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Repository Actions</span>
        <button
          onClick={() => onAdminAction('add-template')}
          className="w-full text-left px-3 py-2 text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md transition-colors"
        >
          ➕ Upload New Template
        </button>
        <button
          onClick={() => onAdminAction('edit-template')}
          className="w-full text-left px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          ✏️ Edit Template Metadata
        </button>
        <button
          onClick={() => onAdminAction('delete-template')}
          className="w-full text-left px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          🗑️ Remove Old Template
        </button>
      </div>

      <div className="border-t pt-4 space-y-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Quick Analytics</span>
        <div className="text-xs space-y-1.5 text-gray-600">
          <div className="flex justify-between"><span>Initiation:</span> <span className="font-semibold">5 files</span></div>
          <div className="flex justify-between"><span>Planning:</span> <span className="font-semibold">9 files</span></div>
          <div className="flex justify-between"><span>Execution:</span> <span className="font-semibold">6 files</span></div>
          <div className="flex justify-between"><span>Monitoring:</span> <span className="font-semibold">6 files</span></div>
          <div className="flex justify-between"><span>Closure:</span> <span className="font-semibold">5 files</span></div>
        </div>
      </div>
    </div>
  );
}