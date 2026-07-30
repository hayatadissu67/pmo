import React, { useState } from 'react';

export default function UseTemplate({ template, onClose }) {
  const [projectName, setProjectName] = useState('');

  const handleGenerate = (e) => {
    e.preventDefault();
    alert(`Instantiated template "${template?.name}" for project: "${projectName}"!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-base font-bold text-gray-800">Instantiate Template</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <form onSubmit={handleGenerate} className="space-y-3 text-xs">
          <p className="text-gray-500">
            Selected Base Template: <strong className="text-gray-800">{template?.name || 'Template'}</strong>
          </p>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Target Project Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Core System Upgrade"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t">
            <button type="button" onClick={onClose} className="px-3 py-1.5 border rounded-md text-gray-600 font-semibold">Cancel</button>
            <button type="submit" className="px-3 py-1.5 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700">Generate Document</button>
          </div>
        </form>
      </div>
    </div>
  );
}