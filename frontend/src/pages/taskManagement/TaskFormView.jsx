import React from 'react';

export default function TaskFormView({
  editingId,
  formData,
  handleInputChange,
  handleSaveTask,
  teamMembers,
  setActiveTab
}) {
  return (
    <div className="bg-white p-8 rounded-xl border border-slate-200 max-w-2xl mx-auto shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 mb-6">
        {editingId !== null ? 'Edit Task' : 'Create Task'}
      </h3>

      <form onSubmit={handleSaveTask} className="flex flex-col gap-5">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">📌 Task Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Task Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Implement OAuth Flow"
                required
                className="w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">Category</label>
              <select name="category" value={formData.category} onChange={handleInputChange} className="w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-sm bg-white">
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="DevOps">DevOps</option>
                <option value="Product">Product Management</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">Task Type</label>
              <select name="type" value={formData.type} onChange={handleInputChange} className="w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-sm bg-white">
                <option value="Feature">Feature</option>
                <option value="Bug / Security">Bug / Security</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Documentation">Documentation</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700">Assignee</label>
            <select name="assignee" value={formData.assignee} onChange={handleInputChange} className="w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-sm bg-white">
              {teamMembers.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Priority</label>
            <select name="priority" value={formData.priority} onChange={handleInputChange} className="w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-sm bg-white">
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Status</label>
            <select name="status" value={formData.status} onChange={handleInputChange} className="w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-sm bg-white">
              <option value="Pending">Pending / To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Blocked">Blocked</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-sm bg-white"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            placeholder="Detailed instructions or specifications..."
            className="w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700">Checklist (Comma Separated)</label>
            <input
              type="text"
              name="checklistText"
              value={formData.checklistText}
              onChange={handleInputChange}
              placeholder="Subtask 1, Subtask 2"
              className="w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Attachments (Comma Separated)</label>
            <input
              type="text"
              name="attachments"
              value={formData.attachments}
              onChange={handleInputChange}
              placeholder="spec.pdf, schema.png"
              className="w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={() => setActiveTab('Task List')}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-sm border border-slate-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm shadow-sm"
          >
            {editingId !== null ? 'Update Task' : 'Save Task'}
          </button>
        </div>
      </form>
    </div>
  );
}