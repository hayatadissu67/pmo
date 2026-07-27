import React from 'react';

export default function SelectDateRange({ value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">Reporting Date Range</label>
      <div className="flex gap-2">
        <input 
          type="date" 
          value={value.start || ''} 
          onChange={(e) => onChange({...value, start: e.target.value})}
          className="w-1/2 border border-gray-300 rounded-md p-2 text-sm bg-white" 
        />
        <input 
          type="date" 
          value={value.end || ''} 
          onChange={(e) => onChange({...value, end: e.target.value})}
          className="w-1/2 border border-gray-300 rounded-md p-2 text-sm bg-white" 
        />
      </div>
    </div>
  );
}