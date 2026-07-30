import React from 'react';

export default function SortReports({ onSortChange }) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs font-semibold text-gray-600">Sort By:</span>
      <select
        onChange={(e) => onSortChange && onSortChange(e.target.value)}
        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="date-desc">Date (Newest First)</option>
        <option value="date-asc">Date (Oldest First)</option>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
      </select>
    </div>
  );
}