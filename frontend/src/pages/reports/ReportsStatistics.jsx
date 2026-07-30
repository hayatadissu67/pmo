import React from 'react';

export default function ReportsStatistics() {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-800 text-lg mb-4">Compliance Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">On-Time Submissions</span>
            <span className="font-semibold text-green-600">88%</span>
          </div>
          <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '88%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Approval Rate</span>
            <span className="font-semibold text-blue-600">94%</span>
          </div>
          <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '94%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}