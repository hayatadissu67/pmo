import React from 'react';

export default function CalendarAndDeadlinesView({ tasks }) {
  const sortedByDeadline = [...tasks].sort(
    (a, b) => new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31')
  );

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-1">📅 Upcoming Deadlines & Schedule</h3>
      <p className="text-sm text-slate-500 mb-6">Track project timelines and urgent deliverables.</p>

      <div className="flex flex-col gap-4">
        {sortedByDeadline.map((t) => {
          const isOverdue = new Date(t.dueDate) < new Date() && t.status !== 'Completed';
          return (
            <div key={t.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 gap-3">
              <div className="flex items-center gap-4">
                <div className={`px-3 py-2 rounded-lg text-center font-bold text-xs ${isOverdue ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                  📅 {t.dueDate || 'No Date'}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm m-0">{t.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Assigned to <b>{t.assignee}</b> • {t.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isOverdue && (
                  <span className="bg-red-50 text-red-600 border border-red-200 text-xs font-bold px-2.5 py-1 rounded-md">
                    Overdue
                  </span>
                )}
                <span className="bg-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                  {t.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}