import React from 'react';
import { getPriorityBadgeClass, getStatusBadgeClass } from './badgeHelpers.jsx';

export default function TaskListView({
  searchQuery,
  setSearchQuery,
  filterPriority,
  setFilterPriority,
  filterCategory,
  setFilterCategory,
  sortBy,
  setSortBy,
  filteredTasks,
  setSelectedTaskDetails,
  selectedTaskDetails,
  handleEditInit,
  handleDeleteTask
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="🔍 Search tasks, assignees, or keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
        >
          <option value="All">All Categories</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="DevOps">DevOps</option>
          <option value="Marketing">Marketing</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
        >
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <th className="p-3">Title & Category</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Status</th>
              <th className="p-3">Assignee</th>
              <th className="p-3">Due Date</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTasks.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/80 transition">
                <td className="p-3">
                  <div className="font-semibold text-slate-900">{t.title}</div>
                  <div className="text-xs text-slate-400">{t.category} • {t.type}</div>
                </td>
                <td className="p-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${getPriorityBadgeClass(t.priority)}`}>
                    {t.priority}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${getStatusBadgeClass(t.status)}`}>
                    {t.status}
                  </span>
                </td>
                <td className="p-3 font-medium text-slate-700">{t.assignee}</td>
                <td className="p-3 text-slate-600">{t.dueDate}</td>
                <td className="p-3 text-right space-x-2">
                  <button onClick={() => setSelectedTaskDetails(t)} className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-xs font-medium">Details</button>
                  <button onClick={() => handleEditInit(t)} className="px-2.5 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 rounded text-xs font-medium">Edit</button>
                  <button onClick={() => handleDeleteTask(t.id)} className="px-2.5 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 rounded text-xs font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTaskDetails && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-300">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-base font-bold text-slate-900">Task Details: {selectedTaskDetails.title}</h4>
            <button onClick={() => setSelectedTaskDetails(null)} className="text-xs text-slate-500 hover:text-slate-800 font-bold">✕ Close</button>
          </div>
          <p className="text-xs text-slate-600 mb-1"><b>Category & Type:</b> {selectedTaskDetails.category} ({selectedTaskDetails.type})</p>
          <p className="text-xs text-slate-600 mb-1"><b>Description:</b> {selectedTaskDetails.description}</p>
          <p className="text-xs text-slate-600 mb-1"><b>Milestone:</b> {selectedTaskDetails.milestone || 'N/A'}</p>
          {selectedTaskDetails.delayReason && (
            <p className="text-xs text-rose-600 font-semibold mb-1"><b>Delay Reason:</b> {selectedTaskDetails.delayReason}</p>
          )}
        </div>
      )}
    </div>
  );
}