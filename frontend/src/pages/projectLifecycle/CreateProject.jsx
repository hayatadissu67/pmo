import React, { useState } from 'react';

export default function CreateProject({ onProjectCreated }) {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [projectManager, setProjectManager] = useState('');
  const [pmoLead, setPmoLead] = useState('');
  const [teamMembers, setTeamMembers] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !projectManager || !pmoLead) {
      alert('Please fill in required fields (Project Title, Project Manager, and PMO/Project Lead).');
      return;
    }

    const newProject = {
      code: code || `PRJ-2026-00${Math.floor(Math.random() * 90) + 10}`,
      title,
      description,
      budget: budget || '0',
      priority,
      projectManager,
      pmoLead,
      teamMembers: teamMembers ? teamMembers.split(',').map((item) => item.trim()) : [],
      status: 'Initiation',
      scheduleHealth: 'On Track',
      budgetHealth: 'Within Budget',
      progress: 0,
    };

    if (onProjectCreated) {
      onProjectCreated(newProject);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900">Create New Project</h2>
        <p className="text-xs text-slate-500">Define governance parameters, leadership, and assigned team members</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Project Code */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
              Project Code
            </label>
            <input
              type="text"
              placeholder="e.g. PRJ-2026-005"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Project Title */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
              Project Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Core System Integration"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Project Manager */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
              Project Manager *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Mercer"
              value={projectManager}
              onChange={(e) => setProjectManager(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Project / PMO Lead */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
              Project Lead / PMO Lead *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sarah Jenkins"
              value={pmoLead}
              onChange={(e) => setPmoLead(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
              Priority Level
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          {/* Initial Budget */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
              Initial Budget ($)
            </label>
            <input
              type="number"
              placeholder="e.g. 150000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        {/* Assigned Team Members */}
        <div>
          <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
            Assign Team Members (Comma Separated)
          </label>
          <input
            type="text"
            placeholder="e.g. John Doe (Backend), Alice Smith (Frontend), Mark Vance (QA)"
            value={teamMembers}
            onChange={(e) => setTeamMembers(e.target.value)}
            className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-[10px] text-slate-400 mt-1">
            Enter developer or engineer names separated by commas.
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
            Project Description
          </label>
          <textarea
            rows={3}
            placeholder="Brief description of goals and scope..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit CTA */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all"
          >
            Create & Assign Project
          </button>
        </div>
      </form>
    </div>
  );
}