import React, { useState } from 'react';

export default function ProjectStatus({ currentPhase = 'Planning', onUpdateStatus }) {
  const [scheduleHealth, setScheduleHealth] = useState('On Track');
  const [budgetHealth, setBudgetHealth] = useState('Within Budget');
  const [pmoGovernance, setPmoGovernance] = useState('Approved');
  const [pmNotes, setPmNotes] = useState('All deliverables are progressing according to baseline schedule.');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);

    if (onUpdateStatus) {
      onUpdateStatus({
        scheduleHealth,
        budgetHealth,
        pmoGovernance,
        pmNotes,
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Project Health & Status Report</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Project Manager Governance Controls & High-Level Oversight
          </p>
        </div>
        <span className="self-start sm:self-auto px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
          Current Phase: {currentPhase}
        </span>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Status Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Schedule Health */}
          <div className="p-4 rounded-xl border border-slate-200/70 bg-slate-50/50 space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
              Schedule Health
            </label>
            <select
              value={scheduleHealth}
              onChange={(e) => setScheduleHealth(e.target.value)}
              className="w-full text-xs font-semibold p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="On Track">🟢 On Track</option>
              <option value="At Risk">🟡 At Risk (Needs Attention)</option>
              <option value="Delayed">🔴 Delayed / Critical</option>
            </select>
          </div>

          {/* Budget Health */}
          <div className="p-4 rounded-xl border border-slate-200/70 bg-slate-50/50 space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
              Budget Health
            </label>
            <select
              value={budgetHealth}
              onChange={(e) => setBudgetHealth(e.target.value)}
              className="w-full text-xs font-semibold p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="Within Budget">🟢 Within Budget</option>
              <option value="Near Threshold">🟡 Near Budget Threshold</option>
              <option value="Over Budget">🔴 Over Budget</option>
            </select>
          </div>

          {/* PMO Governance */}
          <div className="p-4 rounded-xl border border-slate-200/70 bg-slate-50/50 space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
              Governance Gate
            </label>
            <select
              value={pmoGovernance}
              onChange={(e) => setPmoGovernance(e.target.value)}
              className="w-full text-xs font-semibold p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="Approved">🟢 Approved for Next Phase</option>
              <option value="Pending Review">🟡 Pending PMO Review</option>
              <option value="Escalated">🔴 Escalated to Executive</option>
            </select>
          </div>

        </div>

        {/* PM Remarks / Narrative */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Project Manager Executive Summary & Remarks
          </label>
          <textarea
            rows={3}
            value={pmNotes}
            onChange={(e) => setPmNotes(e.target.value)}
            placeholder="Explain why the project is on track or what risks are present..."
            className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="text-xs font-semibold text-emerald-600 animate-fade-in">
              ✓ Status Report Saved Successfully!
            </span>
          ) : (
            <span className="text-xs text-slate-400">
              Changes will update high-level PMO dashboards.
            </span>
          )}

          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all"
          >
            Save Status Updates
          </button>
        </div>
      </form>
    </div>
  );
}