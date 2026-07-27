import React from 'react';

export default function EditTemplate({ template }) {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
      <h4 className="font-bold text-gray-800 text-sm mb-2">Edit Template</h4>
      {template ? (
        <button className="text-xs bg-yellow-50 text-yellow-700 border border-yellow-300 py-2 px-3 rounded font-medium w-full hover:bg-yellow-100 transition-colors">
          Edit "{template.name}"
        </button>
      ) : (
        <p className="text-xs text-gray-400 italic">Select a template to modify</p>
      )}
    </div>
  );
}