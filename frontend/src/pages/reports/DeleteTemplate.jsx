import React from 'react';

export default function DeleteTemplate({ template }) {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
      <h4 className="font-bold text-gray-800 text-sm mb-2">Delete Template</h4>
      {template ? (
        <button className="text-xs bg-red-50 text-red-600 border border-red-300 py-2 px-3 rounded font-medium w-full hover:bg-red-100 transition-colors">
          Remove "{template.name}"
        </button>
      ) : (
        <p className="text-xs text-gray-400 italic">Select a template to remove</p>
      )}
    </div>
  );
}