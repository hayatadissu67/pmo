import React from 'react';

export default function QuickActions({ onNavigate }) {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-purple-500">
      <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Quick Actions</p>
      <div className="flex flex-col gap-2">
        <button 
          onClick={() => onNavigate('generate')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-3 rounded transition-colors"
        >
          + Create New Report
        </button>
        <button 
          onClick={() => onNavigate('templates')}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2 px-3 rounded border border-gray-200 transition-colors"
        >
          Manage Templates
        </button>
      </div>
    </div>
  );
}