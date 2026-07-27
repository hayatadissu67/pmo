import React, { useState } from 'react';

export default function BudgetAllocation() {
  const [allocations] = useState([
    { id: 1, dept: 'Cloud & Infrastructure', allocated: 20000, project: 'PMO Tower' },
    { id: 2, dept: 'Human Resources', allocated: 35000, project: 'Team Stipends' },
  ]);

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Department & Project Allocation</h3>
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b text-gray-400">
            <th className="pb-3 font-medium">Department</th>
            <th className="pb-3 font-medium">Project</th>
            <th className="pb-3 font-medium text-right">Allocated Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {allocations.map(a => (
            <tr key={a.id}>
              <td className="py-3 font-medium text-gray-800">{a.dept}</td>
              <td className="py-3 text-gray-500">{a.project}</td>
              <td className="py-3 text-right font-bold">${a.allocated.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}