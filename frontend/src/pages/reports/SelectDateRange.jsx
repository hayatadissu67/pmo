import React, { useState } from 'react';

export default function SelectDateRange({ onDateRangeChange }) {
  const [preset, setPreset] = useState('30days');
  const [startDate, setStartDate] = useState('2026-07-01');
  const [endDate, setEndDate] = useState('2026-07-30');

  const handlePresetChange = (val) => {
    setPreset(val);
    if (onDateRangeChange) onDateRangeChange({ preset: val, startDate, endDate });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-1">4. Select Date Range</h3>
      <p className="text-xs text-gray-500 mb-4">Specify the timeframe period for dataset aggregation.</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {['7days', '30days', 'thisQuarter', 'custom'].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => handlePresetChange(item)}
            className={`px-3 py-1.5 text-xs rounded-md transition font-medium capitalize ${
              preset === item
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {item === '7days' ? 'Last 7 Days' : item === '30days' ? 'Last 30 Days' : item === 'thisQuarter' ? 'This Quarter' : 'Custom Range'}
          </button>
        ))}
      </div>

      {preset === 'custom' && (
        <div className="grid grid-cols-2 gap-3 pt-2 border-t">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full text-xs p-2 border rounded focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full text-xs p-2 border rounded focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}