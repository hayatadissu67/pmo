import React, { useState } from 'react';

export default function EditIssue({ issue, onSave, onCancel }) {
  const [title, setTitle] = useState(issue?.title || '');
  const [priority, setPriority] = useState(issue?.priority || 'High');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave({ ...issue, title, priority });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
      <h3 className="font-bold text-slate-800 text-sm">Edit Issue: {issue?.id}</h3>
      <div className="space-y-3 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-slate-200 rounded-lg p-2 focus:outline-none"
          />
        </div>
        <div>
          <label className="block font-bold text-slate-700 mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border border-slate-200 rounded-lg p-2 focus:outline-none"
          >
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg">
          Save Changes
        </button>
        <button type="button" onClick={onCancel} className="bg-slate-100 text-slate-600 text-xs font-bold px-4 py-2 rounded-lg">
          Cancel
        </button>
      </div>
    </form>
  );
}