import React, { useState } from 'react';

export default function ProjectMilestones({ projectCode }) {
  const [milestones, setMilestones] = useState([
    { id: '1', title: 'Project Charter & Scope Approval', phase: 'Initiation', targetDate: '2026-08-15', status: 'Completed' },
    { id: '2', title: 'Architecture & Governance Sign-off', phase: 'Planning', targetDate: '2026-09-01', status: 'In Progress' },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newPhase, setNewPhase] = useState('Planning');
  const [newDate, setNewDate] = useState('');

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!newTitle || !newDate) return;

    const newItem = {
      id: Date.now().toString(),
      title: newTitle,
      phase: newPhase,
      targetDate: newDate,
      status: 'Pending',
    };

    setMilestones([...milestones, newItem]);
    setNewTitle('');
    setNewDate('');
  };

  const toggleStatus = (id) => {
    setMilestones((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus =
            item.status === 'Completed'
              ? 'Pending'
              : item.status === 'Pending'
              ? 'In Progress'
              : 'Completed';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Project Checkpoints & Milestones</h2>
          <p className="text-xs text-slate-500">Key deliverables and target dates for project {projectCode}</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
          {milestones.filter((m) => m.status === 'Completed').length} / {milestones.length} Completed
        </span>
      </div>

      {/* Add Milestone Form */}
      <form onSubmit={handleAddMilestone} className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
        <div className="sm:col-span-1">
          <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Title</label>
          <input
            type="text"
            placeholder="e.g. Architecture Sign-off"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Phase</label>
          <select
            value={newPhase}
            onChange={(e) => setNewPhase(e.target.value)}
            className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="Initiation">Initiation</option>
            <option value="Planning">Planning</option>
            <option value="Execution">Execution</option>
            <option value="Closure">Closure</option>
          </select>
        </div>
        <div>
          <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Target Date</label>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
        >
          Add Milestone
        </button>
      </form>

      {/* Milestones Timeline */}
      <div className="space-y-3">
        {milestones.map((m) => (
          <div
            key={m.id}
            onClick={() => toggleStatus(m.id)}
            className="group flex items-center justify-between p-4 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/20 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">
                {m.status === 'Completed' ? '✅' : m.status === 'In Progress' ? '⏳' : '⚪'}
              </span>
              <div>
                <h4 className={`text-xs font-bold ${m.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                  {m.title}
                </h4>
                <span className="text-[10px] text-slate-500">Phase: {m.phase}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                📅 {m.targetDate}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  m.status === 'Completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : m.status === 'In Progress'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {m.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}