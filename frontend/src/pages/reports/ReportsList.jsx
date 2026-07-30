import React from 'react';

const mockReports = [
  { id: 'REP-001', name: 'Q2 Financial Summary', owner: 'Abebe Kebede', date: '2026-07-28', status: 'Approved' },
  { id: 'REP-002', name: 'System Security Audit', owner: 'Chaltu Tadesse', date: '2026-07-25', status: 'Pending' },
  { id: 'REP-003', name: 'Network Traffic Log', owner: 'Mulugeta Alemu', date: '2026-07-20', status: 'Draft' },
];

export default function ReportsList({ reports = mockReports, onView, onDelete }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">All Reports List</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
              <th className="p-3">Report ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Owner</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm text-gray-700">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50 transition">
                <td className="p-3 font-mono text-xs text-gray-500">{report.id}</td>
                <td className="p-3 font-semibold text-gray-800">{report.name}</td>
                <td className="p-3">{report.owner}</td>
                <td className="p-3 text-gray-500">{report.date}</td>
                <td className="p-3">
                  <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                    report.status === 'Approved' ? 'bg-green-100 text-green-700' :
                    report.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => onView && onView(report.id)}
                    className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onDelete && onDelete(report.id)}
                    className="px-3 py-1 bg-red-50 text-red-600 text-xs rounded hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}