import React, { useState } from 'react';

export default function ExpenseTracking() {
  const [expenses] = useState([
    { id: 1, title: 'AWS Cloud Hosting', category: 'Infrastructure', amount: 1200, date: '2026-07-20' },
  ]);

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Expense List & Records</h3>
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b text-gray-400">
            <th className="pb-3 font-medium">Title</th>
            <th className="pb-3 font-medium">Category</th>
            <th className="pb-3 font-medium">Date</th>
            <th className="pb-3 font-medium text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {expenses.map(e => (
            <tr key={e.id}>
              <td className="py-3 font-medium text-gray-800">{e.title}</td>
              <td className="py-3 text-gray-500">{e.category}</td>
              <td className="py-3 text-gray-500">{e.date}</td>
              <td className="py-3 text-right font-bold">${e.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}