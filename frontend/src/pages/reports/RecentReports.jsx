import React from 'react';

export default function RecentReports({ onSelect }) {
  const list = [
    { id: 101, title: 'PMO Weekly Status - W28', project: 'Control Tower', date: 'Jul 26', status: 'Approved' },
    { id: 102, title: 'Risk Log Audit Q2', project: 'Cloud Migration', date: 'Jul 24', status: 'Pending' },
    { id: 103, title: 'Budget Allocation Report', project: 'ERP Platform', date: 'Jul 22', status: 'Approved' }
  ];

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-800 text-lg mb-3">Recent Reports</h3>
      <div className="divide-y divide-gray-100">
        {list.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onSelect && onSelect(item)}
            className="py-2.5 flex justify-between items-center text-sm cursor-pointer hover:bg-gray-50 px-2 rounded transition-colors"
          >
            <div>
              <p className="font-medium text-gray-800">{item.title}</p>
              <p className="text-xs text-gray-500">{item.project}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 block mb-0.5">{item.date}</span>
              <span className={`text-xs px-2 py-0.5 rounded font-medium ${item.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}