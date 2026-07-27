import React from 'react';

export default function FilterReports({ filter, setFilter }) {
  return (
    <select 
      value={filter} 
      onChange={(e) => setFilter(e.target.value)}
      className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    >
      <option value="ALL">All Statuses</option>
      <option value="APPROVED">Approved</option>
      <option value="PENDING">Pending</option>
      <option value="DRAFT">Draft</option>
    </select>
  );
}