import React from 'react';

export default function SelectTemplate({ value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">Select Template</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="">-- Select Layout Template --</option>
        <option value="t1">Weekly Status Report Template</option>
        <option value="t2">Risk & Audit Log Template</option>
      </select>
    </div>
  );
}