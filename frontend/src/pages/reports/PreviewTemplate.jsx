import React from 'react';

export default function PreviewTemplate({ template, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-xl w-full p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-base font-bold text-gray-800">📄 Preview: {template?.name || 'Template'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="bg-gray-100 p-4 border rounded-md h-56 overflow-y-auto font-serif text-xs text-gray-700 space-y-2">
          <h2 className="text-center font-bold text-sm text-gray-900 uppercase border-b pb-1">{template?.name || 'DOCUMENT TEMPLATE'}</h2>
          <p className="text-center text-gray-400 text-[10px]">Governance Version {template?.version || '1.0'}</p>
          <p className="pt-2"><strong>1. Objective:</strong> Standard governance structure for project artifacts.</p>
          <p><strong>2. Guidelines:</strong> Complete all mandatory fields before submission to PMO Lead.</p>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t">
          <button onClick={onClose} className="px-3 py-1.5 border rounded-md text-xs font-semibold text-gray-600">Close</button>
          <button onClick={() => alert(`Downloading ${template?.name}...`)} className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-semibold hover:bg-blue-700">Download File</button>
        </div>
      </div>
    </div>
  );
}