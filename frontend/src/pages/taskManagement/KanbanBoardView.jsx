import React, { useState, useEffect } from 'react';

export default function KanbanBoardView({ tasks: propTasks = [], setTasks: propSetTasks, addActivity }) {
  // Local state fallback so UI moves tasks even if parent setTasks is missing
  const [localTasks, setLocalTasks] = useState(propTasks);

  useEffect(() => {
    setLocalTasks(propTasks);
  }, [propTasks]);

  const activeTasks = propTasks.length > 0 ? propTasks : localTasks;

  // Pipeline stages
  const STAGES = ['TO DO', 'IN PROGRESS', 'REVIEW', 'BLOCKED', 'COMPLETED'];

  const columns = [
    { title: 'TO DO', key: 'TO DO', bg: 'bg-slate-100', text: 'text-slate-700' },
    { title: 'IN PROGRESS', key: 'IN PROGRESS', bg: 'bg-blue-50', text: 'text-blue-700' },
    { title: 'REVIEW', key: 'REVIEW', bg: 'bg-purple-50', text: 'text-purple-700' },
    { title: 'BLOCKED', key: 'BLOCKED', bg: 'bg-rose-50', text: 'text-rose-700' },
    { title: 'COMPLETED', key: 'COMPLETED', bg: 'bg-emerald-50', text: 'text-emerald-700' }
  ];

  const handleStageChange = (taskId, targetStatus) => {
    if (!targetStatus) return;

    const updateState = (prevTasks) =>
      prevTasks.map((task) => {
        if (String(task.id) === String(taskId)) {
          const upperTarget = targetStatus.toString().trim().toUpperCase();
          const isCompleted = upperTarget === 'COMPLETED';
          const isReview = upperTarget === 'REVIEW';
          const isInProgress = upperTarget === 'IN PROGRESS';

          if (addActivity) {
            addActivity(`Moved "${task.title}" to ${targetStatus}`);
          }

          return {
            ...task,
            kanbanStatus: targetStatus,
            status: targetStatus,
            progress: isCompleted ? 100 : isReview ? 80 : isInProgress ? 50 : task.progress || 0,
            completionDate: isCompleted
              ? new Date().toISOString().split('T')[0]
              : null
          };
        }
        return task;
      });

    // Check if parent state updater exists
    if (typeof propSetTasks === 'function') {
      propSetTasks(updateState);
    } else {
      console.warn(
        'KanbanBoardView Warning: `setTasks` prop was not passed down from parent. ' +
        'Falling back to local state to allow UI changes.'
      );
      setLocalTasks(updateState);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          📋 Project Task Board
        </h3>
        <p className="text-sm text-slate-500">
          Select a destination stage from the dropdown menu on any task card to move it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {columns.map((col) => {
          // Normalize status matching to avoid casing issues
          const colTasks = activeTasks.filter((t) => {
            const current = (t.kanbanStatus || t.status || 'TO DO').toString().trim().toUpperCase();
            return current === col.key.toUpperCase();
          });

          return (
            <div
              key={col.key}
              className="p-3 rounded-xl border bg-slate-50 border-slate-200 flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded-md ${col.bg} ${col.text}`}>
                  {col.title}
                </span>
                <span className="text-xs font-semibold text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards Container */}
              <div className="flex-1 flex flex-col gap-3">
                {colTasks.map((task) => {
                  const rawStatus = (task.kanbanStatus || task.status || 'TO DO').toString().trim().toUpperCase();

                  return (
                    <div
                      key={task.id}
                      className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {task.category || 'General'}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              task.priority === 'High'
                                ? 'bg-red-100 text-red-700'
                                : task.priority === 'Medium'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>

                        <h4 className="font-semibold text-slate-800 text-xs mb-1">
                          {task.title}
                        </h4>

                        {task.description && (
                          <p className="text-[11px] text-slate-500 mb-3 line-clamp-2">
                            {task.description}
                          </p>
                        )}
                      </div>

                      <div className="pt-2.5 mt-1 border-t border-slate-100 flex flex-col gap-2">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-0.5">
                          <span className="font-medium text-slate-600">👤 {task.assignee || 'Unassigned'}</span>
                          {task.dueDate && <span className="text-[10px] text-slate-400">📅 {task.dueDate}</span>}
                        </div>

                        {/* Select Target Stage Dropdown */}
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">Move to:</span>
                          <select
                            value={rawStatus}
                            onChange={(e) => handleStageChange(task.id, e.target.value)}
                            className="flex-1 text-[11px] bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                          >
                            {STAGES.map((s) => (
                              <option key={s} value={s}>
                                {s === rawStatus ? `${s} (Current)` : s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {colTasks.length === 0 && (
                  <div className="flex-1 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center p-3 text-[11px] text-slate-400">
                    No tasks in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}