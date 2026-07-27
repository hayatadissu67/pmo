import React from 'react';

export default function AssignMembersView({ tasks, setTasks, teamMembers, addActivity }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-1">Task Allocation Matrix</h3>
      <p className="text-sm text-slate-500 mb-6">Reassign active tasks to team members directly.</p>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 gap-3">
            <div>
              <div className="font-semibold text-slate-900">{task.title}</div>
              <div className="text-xs text-slate-500">Current Assignee: <b className="text-slate-700">{task.assignee}</b></div>
            </div>
            <select
              value={task.assignee}
              onChange={(e) => {
                const updated = tasks.map((t) => t.id === task.id ? { ...t, assignee: e.target.value } : t);
                setTasks(updated);
                addActivity(`Reassigned "${task.title}" to ${e.target.value}`);
              }}
              className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white font-medium"
            >
              {teamMembers.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}