import React from 'react';

export default function SortReports({ sort, setSort }) {
  return (
    <select 
      value={sort} 
      onChange={(e) => setSort(e.target.value)}
      className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    >
      <option value="date">Sort by Date</option>
      <option value="title">Sort by Title</option>
    </select>
  );
}