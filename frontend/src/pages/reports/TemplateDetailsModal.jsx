import React from 'react';

export default function TemplateDetailsModal({ template, onClose, onPreview }) {
  if (!template) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 space-y-4">
        <div className="flex justify-between items-start border-b pb-3">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{template.category}</span>
            <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg font-bold">✕</button>
        </div>

        <div className="space-y-3 text-xs text-gray-600">
          <p><strong className="text-gray-800">Description:</strong> {template.description}</p>
          <div className="bg-gray-50 p-3 rounded-md border space-y-1">
            <p><strong className="text-gray-700">File Format:</strong> {template.fileType}</p>
            <p><strong className="text-gray-700">Version:</strong> {template.version}</p>
            <p><strong className="text-gray-700">Last Updated:</strong> {template.date}</p>
            <p><strong className="text-gray-700">File Path:</strong> <code className="bg-gray-200 px-1 rounded">{template.path}</code></p>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t">
          <button onClick={onClose} className="px-4 py-2 border rounded-md text-xs font-semibold text-gray-600 hover:bg-gray-50">
            Close
          </button>
          <button onClick={onPreview} className="px-4 py-2 bg-blue-600 text-white rounded-md text-xs font-semibold hover:bg-blue-700">
            Preview Layout
          </button>
        </div>
      </div>
    </div>
  );
}