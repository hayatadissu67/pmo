import React from 'react';

export default function ReportsOverview() {
  const categories = [
    { name: 'Weekly Status', count: 42, color: 'bg-blue-500' },
    { name: 'Monthly Reviews', count: 18, color: 'bg-green-500' },
    { name: 'Risk & Audit Logs', count: 12, color: 'bg-yellow-500' },
    { name: 'Project Closures', count: 5, color: 'bg-purple-500' }
  ];

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-800 text-lg mb-1">Reports Overview</h3>
      <p className="text-sm text-gray-500 mb-4">Distribution of active reports by domain type.</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((cat, idx) => (
          <div key={idx} className="p-4 bg-gray-50 border border-gray-100 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
              <span className="text-xs font-semibold text-gray-600">{cat.name}</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">{cat.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}