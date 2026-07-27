import React, { useState } from 'react';

export default function BudgetMonitoring() {
  const [monitoring] = useState([
    { id: 1, dept: 'Infrastructure', allocated: 20000, spent: 18500, health: 'Healthy' },
  ]);

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget vs Actual Monitoring</h3>
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b text-gray-400">
            <th className="pb-3 font-medium">Department</th>
            <th className="pb-3 font-medium">Allocated</th>
            <th className="pb-3 font-medium">Actual Spent</th>
            <th className="pb-3 font-medium">Health</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {monitoring.map(m => (
            <tr key={m.id}>
              <td className="py-3 font-medium text-gray-800">{m.dept}</td>
              <td className="py-3 text-gray-600">${m.allocated.toLocaleString()}</td>
              <td className="py-3 text-gray-600">${m.spent.toLocaleString()}</td>
              <td className="py-3 text-green-600 font-semibold">{m.health}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}