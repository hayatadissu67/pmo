import React, { useState } from 'react';

export default function IssueResolution({ issue, onResolve }) {
  const [resolutionNotes, setResolutionNotes] = useState('');

  const handleResolve = (e) => {
    e.preventDefault();
    if (!resolutionNotes.trim()) return;

    if (onResolve) {
      onResolve({
        issueId: issue?.id,
        resolutionNotes,
        resolvedAt: new Date().toISOString().split('T')[0],
      });
    }
  };

  return (
    <form onSubmit={handleResolve} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="font-bold text-slate-800 text-sm">Issue Resolution & Root Cause</h3>
        <p className="text-xs text-slate-500">Document resolution details before closing this issue</p>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Root Cause & Fix Summary</label>
          <textarea
            rows="3"
            value={resolutionNotes}
            onChange={(e) => setResolutionNotes(e.target.value)}
            placeholder="Describe how the bug or blocker was resolved..."
            className="w-full border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-colors"
      >
        Mark Issue as Resolved
      </button>
    </form>
  );
}