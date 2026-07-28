import React from 'react';

export default function IssueDetails({ issue, onClose }) {
  if (!issue) return null;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <div>
          <span className="text-xs font-bold text-rose-600">{issue.id}</span>
          <h3 className="font-bold text-slate-800 text-sm">{issue.title}</h3>
        </div>
        <button
          onClick={onClose}
          className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1 rounded-lg font-bold"
        >
          Close
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <span className="text-slate-400 block">Project Code</span>
          <span className="font-bold text-slate-700">{issue.projectCode}</span>
        </div>
        <div>
          <span className="text-slate-400 block">Priority</span>
          <span className="font-bold text-rose-600">{issue.priority}</span>
        </div>
      </div>
    </div>
  );
}