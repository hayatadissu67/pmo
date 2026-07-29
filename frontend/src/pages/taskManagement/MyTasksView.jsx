import React from 'react';
import { getPriorityBadgeClass, getStatusBadgeClass } from './badgeHelpers.jsx';

export default function MyTasksView({
  currentUser,
  setCurrentUser,
  teamMembers,
  myAssignedTasks,
  handleToggleChecklist,
  handleProgressChange
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-lg">
            {currentUser.charAt(0)}
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">Workspace for <b>{currentUser}</b></h3>
            <span className="text-xs text-slate-500">{myAssignedTasks.length} task(s) explicitly assigned</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-600">Switch User:</label>
          <select
            value={currentUser}
            onChange={(e) => setCurrentUser(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-sm font-semibold text-slate-700"
          >
            {teamMembers.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">👤 Tasks Assigned to Me ({myAssignedTasks.length})</h3>

        {myAssignedTasks.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
            No active tasks are assigned to {currentUser} at the moment.
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {myAssignedTasks.map((t) => {
              const isOverdue = new Date(t.dueDate) < new Date() && t.status !== 'Completed';
              const currentProgress = t.progress !== undefined ? t.progress : (t.status === 'Completed' ? 100 : t.status === 'In Progress' ? 50 : 0);

              return (
                <div key={t.id} className="bg-slate-50 rounded-xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-slate-900 m-0">{t.title}</h4>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded border ${getPriorityBadgeClass(t.priority)}`}>
                          {t.priority}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Category: <b>{t.category || 'General'}</b> • Role: <b>{t.role || 'Contributor'}</b> ({t.workload || 'Standard'})
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-md text-xs font-semibold self-start md:self-auto ${getStatusBadgeClass(t.status)}`}>
                      {t.status}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mb-4">{t.description || 'No detailed description provided.'}</p>

                  {t.checklist && t.checklist.length > 0 && (
                    <div className="mb-4 bg-white p-3 rounded-lg border border-slate-200">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Subtasks / Checklist</span>
                      <div className="flex flex-col gap-1.5">
                        {t.checklist.map((item) => (
                          <label key={item.id} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item.done}
                              onChange={() => handleToggleChecklist(t.id, item.id)}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <span className={item.done ? 'line-through text-slate-400' : ''}>{item.text}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">⏰ Deadline</span>
                      <div className={`text-sm font-bold mt-1 ${isOverdue ? 'text-red-600' : 'text-slate-900'}`}>
                        📅 {t.dueDate || 'No Date Set'} {isOverdue && <span className="text-xs text-red-500 ml-1">(Overdue)</span>}
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">📈 Update Progress</span>
                        <span className="text-xs font-bold text-blue-600">{currentProgress}%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={currentProgress}
                          onChange={(e) => handleProgressChange(t.id, e.target.value)}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}