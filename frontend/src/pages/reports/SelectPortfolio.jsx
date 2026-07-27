import React from 'react';

export default function SelectPortfolio({ value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">Select Portfolio</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="">-- Select Target Portfolio --</option>
        <option value="port1">Digital Banking</option>
        <option value="port2">Infrastructure Modernization</option>
      </select>
    </div>
  );
}