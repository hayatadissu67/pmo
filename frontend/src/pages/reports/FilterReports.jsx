import React from 'react';

export default function FilterReports({ onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center space-x-2">
        <label className="text-xs font-semibold text-gray-600">Status:</label>
        <select
          onChange={(e) => onFilterChange && onFilterChange('status', e.target.value)}
          className="px-2 py-1 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="All">All Statuses</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label className="text-xs font-semibold text-gray-600">Category:</label>
        <select
          onChange={(e) => onFilterChange && onFilterChange('category', e.target.value)}
          className="px-2 py-1 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>
          <option value="Financial">Financial</option>
          <option value="Technical">Technical</option>
          <option value="Audit">Audit</option>
        </select>
      </div>
    </div>
  );
}