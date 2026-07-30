import React, { useState } from 'react';

export default function EditTemplate({ template, onClose }) {
  const [name, setName] = useState(template?.name || 'Project Charter');
  const [version, setVersion] = useState(template?.version || '2.0');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Updated metadata for "${name}"!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-base font-bold text-gray-800">Edit Template Metadata</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Template Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Version</label>
            <input type="text" value={version} onChange={(e) => setVersion(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t">
            <button type="button" onClick={onClose} className="px-3 py-1.5 border rounded-md text-gray-600 font-semibold">Cancel</button>
            <button type="submit" className="px-3 py-1.5 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}