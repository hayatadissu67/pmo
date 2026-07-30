import React from 'react';

export default function ReportsView({ tasks = [], totalTasks = 0, completionRate = 0, overdueCount = 0 }) {
  const highPriorityCount = tasks.filter((t) => t.priority === 'High').length;
  const blockedCount = tasks.filter((t) => (t.kanbanStatus || t.status || '').toUpperCase() === 'BLOCKED').length;

  // --- NEW: MEMBER PERFORMANCE CALCULATION ---
  const memberPerformance = tasks.reduce((acc, task) => {
    const assignee = task.assignee || 'Unassigned';
    if (!acc[assignee]) {
      acc[assignee] = { total: 0, completed: 0, inProgress: 0, blocked: 0 };
    }
    acc[assignee].total += 1;
    
    const status = (task.kanbanStatus || task.status || '').toUpperCase();
    if (status === 'COMPLETED') acc[assignee].completed += 1;
    else if (status === 'IN PROGRESS') acc[assignee].inProgress += 1;
    else if (status === 'BLOCKED') acc[assignee].blocked += 1;

    return acc;
  }, {});

  // --- NEW: PROJECT PROGRESS / CATEGORY BREAKDOWN ---
  const categoryProgress = tasks.reduce((acc, task) => {
    const category = task.category || 'General';
    if (!acc[category]) {
      acc[category] = { total: 0, completed: 0 };
    }
    acc[category].total += 1;

    const status = (task.kanbanStatus || task.status || '').toUpperCase();
    if (status === 'COMPLETED') acc[category].completed += 1;

    return acc;
  }, {});

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6">
      {/* HEADER */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">📊 Executive Project Report</h3>
        <p className="text-sm text-slate-500">Summary metrics and health analysis of current project tasks.</p>
      </div>

      {/* TOP STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
          <span className="text-xs font-semibold text-blue-600 uppercase">Completion Rate</span>
          <div className="text-2xl font-bold text-blue-900 mt-1">{completionRate}%</div>
        </div>
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
          <span className="text-xs font-semibold text-red-600 uppercase">High Priority Tasks</span>
          <div className="text-2xl font-bold text-red-900 mt-1">{highPriorityCount}</div>
        </div>
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl">
          <span className="text-xs font-semibold text-rose-600 uppercase">Blocked Bottlenecks</span>
          <div className="text-2xl font-bold text-rose-900 mt-1">{blockedCount}</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
          <span className="text-xs font-semibold text-amber-600 uppercase">Overdue Items</span>
          <div className="text-2xl font-bold text-amber-900 mt-1">{overdueCount}</div>
        </div>
      </div>

      {/* EXISTING SUMMARY BREAKDOWN */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <h4 className="text-sm font-bold text-slate-800 mb-2">📋 Summary Breakdown</h4>
        <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5">
          <li>Total active task count in memory: <b>{totalTasks}</b>.</li>
          <li>Overall completion progress stands at <b>{completionRate}%</b>.</li>
          <li>Currently <b>{blockedCount}</b> task(s) marked as blocked requiring admin intervention.</li>
        </ul>
      </div>

      {/* NEW: PROJECT PROGRESS REPORT */}
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
        <h4 className="text-sm font-bold text-slate-900 mb-1">📈 Project Progress Report (By Category)</h4>
        <p className="text-xs text-slate-500 mb-4">Tracking completion rate across different operational modules.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(categoryProgress).map(([cat, data]) => {
            const catRate = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
            return (
              <div key={cat} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span>{cat}</span>
                  <span className="text-emerald-600">{data.completed}/{data.total} Done ({catRate}%)</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${catRate}%` }}
                  />
                </div>
              </div>
            );
          })}

          {Object.keys(categoryProgress).length === 0 && (
            <p className="text-xs text-slate-400 italic">No category data available.</p>
          )}
        </div>
      </div>

      {/* NEW: MEMBER PERFORMANCE REPORT */}
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
        <h4 className="text-sm font-bold text-slate-900 mb-1">👤 Member Performance Report</h4>
        <p className="text-xs text-slate-500 mb-4">Breakdown of assigned tasks, progress, and blockers per team member.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase font-semibold">
                <th className="p-2.5">Team Member</th>
                <th className="p-2.5">Assigned Tasks</th>
                <th className="p-2.5">In Progress</th>
                <th className="p-2.5">Blocked</th>
                <th className="p-2.5">Completed</th>
                <th className="p-2.5">Completion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {Object.entries(memberPerformance).map(([member, stats]) => {
                const memberRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
                return (
                  <tr key={member} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-2.5 font-semibold text-slate-800">👤 {member}</td>
                    <td className="p-2.5 font-bold text-slate-900">{stats.total}</td>
                    <td className="p-2.5 text-amber-600 font-medium">{stats.inProgress}</td>
                    <td className="p-2.5 text-rose-600 font-medium">{stats.blocked}</td>
                    <td className="p-2.5 text-emerald-600 font-medium">{stats.completed}</td>
                    <td className="p-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{memberRate}%</span>
                        <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full"
                            style={{ width: `${memberRate}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {Object.keys(memberPerformance).length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-slate-400 italic">
                    No active assignees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}