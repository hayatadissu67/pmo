import React, { useState } from 'react';

export default function Milestones({ projectCode }) {
  // Milestone dataset correctly mapped to all 3 project codes
  const [allMilestones, setAllMilestones] = useState({
    // Project 1: Enterprise PMO Control Tower
    'PRJ-2026-001': [
      { id: 'm1', title: 'Scope & Requirements Freeze', phase: 'Initiation', targetDate: '2026-03-15', status: 'Completed' },
      { id: 'm2', title: 'System Architecture Sign-off', phase: 'Planning', targetDate: '2026-04-10', status: 'Completed' },
      { id: 'm3', title: 'Dashboard UI Integration', phase: 'Execution', targetDate: '2026-06-30', status: 'In Progress' },
    ],
    // Project 2: Mobile Core Banking Integration
    'PRJ-2026-002': [
      { id: 'm4', title: 'Core Banking API Spec Approval', phase: 'Design', targetDate: '2026-05-12', status: 'Completed' },
      { id: 'm5', title: 'Penetration Testing Audit', phase: 'Execution', targetDate: '2026-07-20', status: 'In Progress' },
    ],
    // Project 3: Cloud Infrastructure Migration
    'PRJ-2026-003': [
      { id: 'm6', title: 'Project Charter & Scope Approval', phase: 'Initiation', targetDate: '2026-08-15', status: 'Completed' },
      { id: 'm7', title: 'Architecture & Governance Sign-off', phase: 'Planning', targetDate: '2026-09-01', status: 'In Progress' },
    ]
  });

  // Input form state
  const [newTitle, setNewTitle] = useState('');
  const [newPhase, setNewPhase] = useState('Execution');
  const [newTargetDate, setNewTargetDate] = useState('');

  // Automatically filter milestones for the active project
  const currentProjectMilestones = allMilestones[projectCode] || [];

  // Add new milestone handler
  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTargetDate) return;

    const newEntry = {
      id: `m_${Date.now()}`,
      title: newTitle,
      phase: newPhase,
      targetDate: newTargetDate,
      status: 'In Progress'
    };

    setAllMilestones((prev) => ({
      ...prev,
      [projectCode]: [...(prev[projectCode] || []), newEntry]
    }));

    setNewTitle('');
    setNewTargetDate('');
  };

  // Toggle milestone status (Clicking toggles Completed / In Progress)
  const handleToggleStatus = (id) => {
    setAllMilestones((prev) => ({
      ...prev,
      [projectCode]: (prev[projectCode] || []).map((m) =>
        m.id === id
          ? { ...m, status: m.status === 'Completed' ? 'In Progress' : 'Completed' }
          : m
      )
    }));
  };

  const completedCount = currentProjectMilestones.filter((m) => m.status === 'Completed').length;
  const totalCount = currentProjectMilestones.length;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
      {/* Header & Dynamic Counter */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-800">Project Checkpoints & Milestones</h3>
          <p className="text-xs text-slate-500">
            Key deliverables and target dates for project <span className="font-bold text-slate-700">{projectCode}</span>
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
          {completedCount} / {totalCount} Completed
        </span>
      </div>

      {/* Input Form Bar */}
      <form onSubmit={handleAddMilestone} className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
        <input
          type="text"
          placeholder="e.g. Architecture Sign-off"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          value={newPhase}
          onChange={(e) => setNewPhase(e.target.value)}
          className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Initiation">Initiation</option>
          <option value="Planning">Planning</option>
          <option value="Design">Design</option>
          <option value="Execution">Execution</option>
          <option value="Monitoring">Monitoring</option>
          <option value="Closure">Closure</option>
        </select>
        <input
          type="date"
          value={newTargetDate}
          onChange={(e) => setNewTargetDate(e.target.value)}
          className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs py-2 transition-colors shadow-2xs cursor-pointer"
        >
          Add Milestone
        </button>
      </form>

      {/* Dynamic Milestone Cards */}
      <div className="space-y-3">
        {currentProjectMilestones.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            No milestones added for project {projectCode} yet.
          </div>
        ) : (
          currentProjectMilestones.map((m) => {
            const isDone = m.status === 'Completed';
            return (
              <div
                key={m.id}
                onClick={() => handleToggleStatus(m.id)}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                  isDone
                    ? 'bg-emerald-50/30 border-emerald-200/80'
                    : 'bg-white border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isDone ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isDone ? '✓' : '⏳'}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isDone ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                      {m.title}
                    </h4>
                    <span className="text-[10px] text-slate-400">Phase: {m.phase}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                    📅 {m.targetDate}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}