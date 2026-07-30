import React from 'react';

export default function TeamProgressView({ tasks = [], teamMembers = [] }) {
  const activeMembers = teamMembers.filter((m) => m !== 'Unassigned');

  // --- OVERVIEW METRICS ---
  const totalAssignedTasks = tasks.filter((t) => t.assignee && t.assignee !== 'Unassigned').length;
  const totalCompletedTasks = tasks.filter(
    (t) => (t.status || t.kanbanStatus || '').toUpperCase() === 'COMPLETED'
  ).length;
  const overallProgress = totalAssignedTasks > 0 ? Math.round((totalCompletedTasks / totalAssignedTasks) * 100) : 0;

  // --- WORKLOAD DISTRIBUTION CALCULATIONS ---
  const memberTaskCounts = activeMembers.map((member) => ({
    member,
    count: tasks.filter((t) => t.assignee === member).length
  }));

  // --- PRODUCTIVITY CHART DATA ---
  const totalTasksCount = tasks.length || 1;
  const stages = [
    { label: 'To Do', key: 'TO DO', color: 'bg-slate-400', textColor: 'text-slate-600' },
    { label: 'In Progress', key: 'IN PROGRESS', color: 'bg-blue-500', textColor: 'text-blue-600' },
    { label: 'Blocked', key: 'BLOCKED', color: 'bg-rose-500', textColor: 'text-rose-600' },
    { label: 'Completed', key: 'COMPLETED', color: 'bg-emerald-500', textColor: 'text-emerald-600' }
  ];

  const stageBreakdown = stages.map((stage) => {
    const count = tasks.filter(
      (t) => (t.kanbanStatus || t.status || 'TO DO').toString().toUpperCase() === stage.key
    ).length;
    const percentage = Math.round((count / totalTasksCount) * 100);
    return { ...stage, count, percentage };
  });

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">👥 Team Workload & Member Progress</h3>
        <p className="text-sm text-slate-500">Monitor task load distribution and velocity across all team members.</p>
      </div>

      {/* 1. TEAM OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-500">Active Team Members</span>
          <span className="text-2xl font-bold text-slate-900 mt-1">{activeMembers.length}</span>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-500">Total Assigned Tasks</span>
          <span className="text-2xl font-bold text-blue-600 mt-1">{totalAssignedTasks}</span>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-500">Overall Completion Rate</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-bold text-emerald-600">{overallProgress}%</span>
            <span className="text-xs text-slate-400">({totalCompletedTasks}/{totalAssignedTasks} Done)</span>
          </div>
        </div>
      </div>

      {/* 2. PRODUCTIVITY CHART */}
      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">📊 Task Productivity & Status Pipeline</h4>
          <span className="text-xs text-slate-400">{tasks.length} Total Tasks</span>
        </div>

        {/* Stacked Bar Chart */}
        <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden flex mb-4">
          {stageBreakdown.map(
            (stage) =>
              stage.percentage > 0 && (
                <div
                  key={stage.key}
                  style={{ width: `${stage.percentage}%` }}
                  className={`h-full ${stage.color} transition-all duration-300`}
                  title={`${stage.label}: ${stage.count} tasks (${stage.percentage}%)`}
                />
              )
          )}
        </div>

        {/* Legend / Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {stageBreakdown.map((stage) => (
            <div key={stage.key} className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
              <span className={`w-3 h-3 rounded-full ${stage.color}`} />
              <div>
                <div className="text-[11px] font-medium text-slate-500">{stage.label}</div>
                <div className="text-xs font-bold text-slate-800">
                  {stage.count} <span className="text-[10px] font-normal text-slate-400">({stage.percentage}%)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. WORKLOAD DISTRIBUTION */}
      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">⚖️ Workload Balance</h4>
        <div className="space-y-3">
          {memberTaskCounts.map(({ member, count }) => {
            const share = totalAssignedTasks > 0 ? Math.round((count / totalAssignedTasks) * 100) : 0;
            return (
              <div key={member} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{member}</span>
                  <span className="text-slate-500">
                    <strong className="text-slate-800">{count}</strong> tasks ({share}% of total workload)
                  </span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${share}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ORIGINAL MEMBER CARDS */}
      <div className="pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-4">👤 Individual Member Progress</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeMembers.map((member) => {
            const memberTasks = tasks.filter((t) => t.assignee === member);
            const completedTasks = memberTasks.filter(
              (t) => (t.status || t.kanbanStatus || '').toUpperCase() === 'COMPLETED'
            ).length;
            const memberProgress = memberTasks.length > 0 ? Math.round((completedTasks / memberTasks.length) * 100) : 0;

            return (
              <div key={member} className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                      {member.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm m-0">{member}</h4>
                      <span className="text-xs text-slate-500">{memberTasks.length} Assigned Task(s)</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-emerald-600">{memberProgress}%</span>
                </div>

                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${memberProgress}%` }}></div>
                </div>

                <div className="text-xs text-slate-500 space-y-1 mt-1">
                  <div className="flex justify-between">
                    <span>Completed:</span>
                    <b className="text-slate-700">{completedTasks}</b>
                  </div>
                  <div className="flex justify-between">
                    <span>In Progress / Pending:</span>
                    <b className="text-slate-700">{memberTasks.length - completedTasks}</b>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}