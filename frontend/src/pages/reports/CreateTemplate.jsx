import React, { useState } from 'react';

export default function CreateTemplate({ onClose }) {
  const [formData, setFormData] = useState({ name: '', category: 'Initiation', version: '1.0', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Template "${formData.name}" uploaded successfully!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-base font-bold text-gray-800">Upload New PMO Template</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Template Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Risk Mitigation Plan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Phase</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="Initiation">Initiation</option>
                <option value="Planning">Planning</option>
                <option value="Execution">Execution</option>
                <option value="Monitoring">Monitoring</option>
                <option value="Closure">Closure</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Version</label>
              <input
                type="text"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Select File (.docx, .xlsx)</label>
            <input type="file" required className="w-full border p-1 rounded-md text-xs text-gray-500" />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t">
            <button type="button" onClick={onClose} className="px-3 py-1.5 border rounded-md text-gray-600 font-semibold">Cancel</button>
            <button type="submit" className="px-3 py-1.5 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
}