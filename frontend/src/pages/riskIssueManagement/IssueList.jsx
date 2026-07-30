import React from 'react';

export default function IssueList({ issues = [], onSelectIssue }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <h3 className="font-bold text-slate-800 text-sm">Active Issue Tracker</h3>
        <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
          Total: {issues.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400">
              <th className="py-2">Issue ID</th>
              <th className="py-2">Summary</th>
              <th className="py-2">Priority</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {issues.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-6 text-center text-slate-400">
                  No active issues logged for this project.
                </td>
              </tr>
            ) : (
              issues.map((iss) => (
                <tr
                  key={iss.id}
                  onClick={() => onSelectIssue && onSelectIssue(iss)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="py-3 font-bold text-rose-600">{iss.id}</td>
                  <td className="py-3 font-semibold text-slate-800">{iss.title}</td>
                  <td className="py-3 font-bold text-amber-600">{iss.priority}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {iss.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}