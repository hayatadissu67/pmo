import React from 'react';

export default function ReportsList({ query, filter, sort, onSelectReport }) {
  const allReports = [
    { id: 1, title: 'PMO Weekly Status - W28', project: 'Control Tower', status: 'Approved', date: '2026-07-25', author: 'John Doe' },
    { id: 2, title: 'Risk & Issue Matrix', project: 'ERP Solution', status: 'Pending', date: '2026-07-24', author: 'Sarah Smith' },
    { id: 3, title: 'Budget Allocation Report', project: 'Mobile Banking', status: 'Approved', date: '2026-07-20', author: 'Mike Johnson' },
    { id: 4, title: 'Sprint 3 Retrospective', project: 'Control Tower', status: 'Draft', date: '2026-07-18', author: 'Alex Reed' },
  ];

  const filtered = allReports
    .filter(r => r.title.toLowerCase().includes(query.toLowerCase()) || r.project.toLowerCase().includes(query.toLowerCase()))
    .filter(r => filter === 'ALL' || r.status.toUpperCase() === filter)
    .sort((a, b) => sort === 'date' ? new Date(b.date) - new Date(a.date) : a.title.localeCompare(b.title));

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
          <tr>
            <th className="p-3">Report Title</th>
            <th className="p-3">Project</th>
            <th className="p-3">Author</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
            <th className="p-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {filtered.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50 transition-colors">
              <td className="p-3 font-medium text-gray-800">{r.title}</td>
              <td className="p-3 text-gray-600">{r.project}</td>
              <td className="p-3 text-gray-600">{r.author}</td>
              <td className="p-3">
                <span className={`px-2.5 py-0.5 rounded text-xs font-medium ${
                  r.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                  r.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {r.status}
                </span>
              </td>
              <td className="p-3 text-gray-500">{r.date}</td>
              <td className="p-3 text-right">
                <button
                  onClick={() => onSelectReport(r)}
                  className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded font-medium transition-colors"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}