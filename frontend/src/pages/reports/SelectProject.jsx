import React from 'react';

export default function SelectProject({ value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">Select Project</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="">-- Select Target Project --</option>
        <option value="p1">PMO Control Tower</option>
        <option value="p2">ERP Implementation</option>
        <option value="p3">Cloud Infrastructure</option>
      </select>
    </div>
  );
}