import React from 'react';

export default function UseTemplate({ template, onGenerate }) {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
      <div>
        <h3 className="font-bold text-gray-800 text-sm">Use Template</h3>
        <p className="text-xs text-gray-500">
          {template ? `Active: "${template.name}"` : 'Select a template above to start'}
        </p>
      </div>
      {template && (
        <button 
          onClick={onGenerate}
          className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold py-2 px-4 rounded transition-colors"
        >
          Generate with Template →
        </button>
      )}
    </div>
  );
}