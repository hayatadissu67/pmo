import React, { useState } from 'react';

export default function GenerateReport({ onGenerate, isGenerating = false }) {
  const [format, setFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100 space-y-4">
      <h3 className="text-lg font-bold text-gray-800 border-b pb-2">5. Output Configurations</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Export Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full text-sm border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-blue-500"
          >
            <option value="pdf">PDF Document (.pdf)</option>
            <option value="xlsx">Excel Spreadsheet (.xlsx)</option>
            <option value="csv">CSV File (.csv)</option>
          </select>
        </div>

        <div className="flex items-center pt-5">
          <label className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeCharts}
              onChange={(e) => setIncludeCharts(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Include Data Visualizations</span>
          </label>
        </div>
      </div>

      <button
        onClick={() => onGenerate && onGenerate({ format, includeCharts })}
        disabled={isGenerating}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex justify-center items-center space-x-2 disabled:bg-blue-300"
      >
        {isGenerating ? (
          <span>Generating Report...</span>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
            </svg>
            <span>Generate Report</span>
          </>
        )}
      </button>
    </div>
  );
}