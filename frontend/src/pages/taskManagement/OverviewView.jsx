import React from 'react';

export default function OverviewView({
  totalTasks = 0,
  todoCount = 0,
  completedCount = 0,
  inProgressCount = 0,
  blockedCount = 0,
  overdueCount = 0,
  dueTodayTasks = [],
  completionRate = 0,
  activities = [],
  setActiveTab
}) {
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-col gap-6">
      {/* ==================== STAT CARDS ==================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Tasks', count: totalTasks, color: 'text-blue-600', border: 'border-blue-200' },
          { label: 'To Do', count: todoCount, color: 'text-slate-600', border: 'border-slate-200' },
          { label: 'Completed', count: completedCount, color: 'text-emerald-600', border: 'border-emerald-200' },
          { label: 'In Progress', count: inProgressCount, color: 'text-amber-500', border: 'border-amber-200' },
          { label: 'Blocked', count: blockedCount, color: 'text-rose-600', border: 'border-rose-200' },
          { label: 'Overdue / Delayed', count: overdueCount, color: 'text-red-600', border: 'border-red-200' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-5 rounded-xl border ${stat.border} shadow-sm`}>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{stat.label}</span>
            <div className={`text-3xl font-bold ${stat.color} mt-2`}>{stat.count}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ==================== LEFT COLUMN: MAIN OVERVIEW & PROGRESS CHART ==================== */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Task Completion Overview</h3>
            <div className="my-4">
              <div className="flex justify-between items-center mb-2 text-sm font-semibold text-slate-700">
                <span>Overall Project Progress</span>
                <span className="text-emerald-600">{completionRate}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${completionRate}%` }}></div>
              </div>
            </div>

            {/* NEW: TASK PROGRESS CHART BREAKDOWN */}
            <h4 className="text-sm font-semibold text-slate-700 mt-6 mb-3">Task Progress Chart</h4>
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 rounded-xl border border-slate-100 mb-6">
              {/* Circular Progress Ring */}
              <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-500 transition-all duration-500"
                    strokeDasharray={`${completionRate}, 100`}
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-lg font-extrabold text-slate-800">{completionRate}%</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Done</span>
                </div>
              </div>

              {/* Multi-stage Progress Bars */}
              <div className="flex-1 w-full flex flex-col gap-2.5">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1 text-slate-600">
                    <span>To Do</span>
                    <span>{todoCount} ({totalTasks ? Math.round((todoCount / totalTasks) * 100) : 0}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-slate-500 h-full rounded-full" style={{ width: `${totalTasks ? (todoCount / totalTasks) * 100 : 0}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1 text-amber-600">
                    <span>In Progress</span>
                    <span>{inProgressCount} ({totalTasks ? Math.round((inProgressCount / totalTasks) * 100) : 0}%)</span>
                  </div>
                  <div className="w-full bg-amber-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${totalTasks ? (inProgressCount / totalTasks) * 100 : 0}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1 text-rose-600">
                    <span>Blocked</span>
                    <span>{blockedCount} ({totalTasks ? Math.round((blockedCount / totalTasks) * 100) : 0}%)</span>
                  </div>
                  <div className="w-full bg-rose-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: `${totalTasks ? (blockedCount / totalTasks) * 100 : 0}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1 text-emerald-600">
                    <span>Completed</span>
                    <span>{completedCount} ({totalTasks ? Math.round((completedCount / totalTasks) * 100) : 0}%)</span>
                  </div>
                  <div className="w-full bg-emerald-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${totalTasks ? (completedCount / totalTasks) * 100 : 0}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Quick Actions</h4>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setActiveTab('Create Task')} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium transition">
                + Add New Task
              </button>
              <button onClick={() => setActiveTab('Kanban Board')} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium transition">
                📋 Open Kanban
              </button>
              <button onClick={() => setActiveTab('Reports')} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium transition">
                📊 View Reports
              </button>
            </div>
          </div>
        </div>

        {/* ==================== RIGHT COLUMN: TASKS DUE TODAY & AUDIT LOG ==================== */}
        <div className="flex flex-col gap-6">
          {/* NEW: TASKS DUE TODAY PANEL */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-slate-900">⏰ Tasks Due Today</h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                {dueTodayTasks.length}
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">Date: {todayStr}</p>

            <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto">
              {dueTodayTasks.map((task) => (
                <div key={task.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-800">{task.title}</span>
                    <span className="text-[10px] text-slate-400">👤 {task.assignee || 'Unassigned'}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    task.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {task.priority || 'Normal'}
                  </span>
                </div>
              ))}

              {dueTodayTasks.length === 0 && (
                <div className="p-4 border-2 border-dashed border-slate-200 rounded-lg text-center text-xs text-slate-400">
                  🎉 No tasks due today!
                </div>
              )}
            </div>
          </div>

          {/* RECENT AUDIT ACTIVITY */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Audit Activity</h3>
            <div className="flex flex-col gap-3">
              {activities.map((act) => (
                <div key={act.id} className="border-b border-slate-100 pb-2.5">
                  <p className="text-sm text-slate-700 font-medium m-0">{act.text}</p>
                  <span className="text-xs text-slate-400">{act.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}