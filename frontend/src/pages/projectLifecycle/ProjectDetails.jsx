import React, { useState } from 'react';

export default function ProjectDetails({ projectData, onUpdateProject }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(projectData || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (onUpdateProject) onUpdateProject(formData);
    setIsEditing(false);
  };

  const teamList = Array.isArray(projectData?.teamMembers)
    ? projectData.teamMembers
    : typeof projectData?.teamMembers === 'string'
    ? projectData.teamMembers.split(',').map((t) => t.trim())
    : ['John Doe (Dev)', 'Sara Connor (QA)'];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
            {projectData?.code || 'PRJ-2026-001'}
          </span>
          <h2 className="text-xl font-bold text-slate-900">{projectData?.title || 'Project Overview'}</h2>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-3.5 py-1.5 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl transition-all"
        >
          {isEditing ? 'Cancel' : 'Edit Details'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Project Title</label>
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Budget ($)</label>
              <input
                type="number"
                name="budget"
                value={formData.budget || ''}
                onChange={handleChange}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Project Manager</label>
              <input
                type="text"
                name="projectManager"
                value={formData.projectManager || ''}
                onChange={handleChange}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Project / PMO Lead</label>
              <input
                type="text"
                name="pmoLead"
                value={formData.pmoLead || ''}
                onChange={handleChange}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description || ''}
              onChange={handleChange}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-100">
              {projectData?.description || 'No detailed description provided yet.'}
            </p>

            {/* Leadership Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl border border-slate-200/80 bg-white shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Project Manager</span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{projectData?.projectManager || 'Unassigned'}</p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200/80 bg-white shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Project Lead / PMO Lead</span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{projectData?.pmoLead || 'Unassigned'}</p>
              </div>
            </div>

            {/* Assigned Team Members Section */}
            <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                Assigned Team Members ({teamList.length})
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {teamList.map((member, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 shadow-2xs"
                  >
                    <span>👤</span> {member}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Governance Stats</h4>
            <div className="flex justify-between items-center text-xs py-1 border-b border-slate-200/60">
              <span className="text-slate-500">Total Budget:</span>
              <span className="font-bold text-slate-800">${Number(projectData?.budget || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-xs py-1 border-b border-slate-200/60">
              <span className="text-slate-500">Priority Level:</span>
              <span className="font-bold text-blue-700">{projectData?.priority || 'Normal'}</span>
            </div>
            <div className="flex justify-between items-center text-xs py-1">
              <span className="text-slate-500">Current Phase:</span>
              <span className="font-bold text-emerald-700">{projectData?.status || 'Initiation'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}