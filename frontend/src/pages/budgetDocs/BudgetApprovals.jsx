import React, { useState } from 'react';

export default function BudgetApprovals() {
  const [requests] = useState([
    { id: 1, title: 'Extra Figma Licenses', requester: 'Design Team', status: 'Pending' },
  ]);

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Requests & Approvals</h3>
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b text-gray-400">
            <th className="pb-3 font-medium">Request Title</th>
            <th className="pb-3 font-medium">Requester</th>
            <th className="pb-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {requests.map(r => (
            <tr key={r.id}>
              <td className="py-3 font-medium text-gray-800">{r.title}</td>
              <td className="py-3 text-gray-500">{r.requester}</td>
              <td className="py-3 text-yellow-600 font-semibold">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}