import React from 'react';

export default function PreviewTemplate({ template }) {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
      <h4 className="font-bold text-gray-800 text-sm mb-2">Template Preview</h4>
      {template ? (
        <div className="text-xs text-gray-600 space-y-1">
          <p><strong>Title:</strong> {template.name}</p>
          <p><strong>Category:</strong> {template.category}</p>
        </div>
      ) : (
        <p className="text-xs text-gray-400 italic">Select a template to preview</p>
      )}
    </div>
  );
}