import React, { useState } from 'react';

export default function ProjectDetails({ projectData, onUpdateProject }) {
  if (!projectData) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-200 text-slate-500 text-sm">
        No project selected.
      </div>
    );
  }

  // Local state for adding a new team member
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    assignedTask: '',
    progress: 0
  });

  // Handle progress change for an existing member
  const handleMemberProgressChange = (memberId, newProgress) => {
    const validVal = Math.min(100, Math.max(0, Number(newProgress) || 0));

    const updatedMembers = (projectData.teamMembers || []).map((m) =>
      m.id === memberId ? { ...m, progress: validVal } : m
    );

    // Calculate project overall progress based on member average
    const totalMemberProgress = updatedMembers.reduce((acc, m) => acc + m.progress, 0);
    const newOverallProgress = updatedMembers.length > 0
      ? Math.round(totalMemberProgress / updatedMembers.length)
      : projectData.progress;

    onUpdateProject({
      teamMembers: updatedMembers,
      progress: newOverallProgress
    });
  };

  // Add a new team member
  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.role) return;

    const createdMember = {
      id: `m_${Date.now()}`,
      name: newMember.name,
      role: newMember.role,
      assignedTask: newMember.assignedTask || 'General Tasks',
      progress: Number(newMember.progress) || 0
    };

    const updatedMembers = [...(projectData.teamMembers || []), createdMember];

    // Recalculate average progress
    const totalProgress = updatedMembers.reduce((acc, m) => acc + m.progress, 0);
    const newOverallProgress = Math.round(totalProgress / updatedMembers.length);

    onUpdateProject({
      teamMembers: updatedMembers,
      progress: newOverallProgress
    });

    // Reset form
    setNewMember({ name: '', role: '', assignedTask: '', progress: 0 });
    setShowAddMember(false);
  };

  // Remove a team member
  const handleRemoveMember = (memberId) => {
    const updatedMembers = (projectData.teamMembers || []).filter((m) => m.id !== memberId);
    
    const totalProgress = updatedMembers.reduce((acc, m) => acc + m.progress, 0);
    const newOverallProgress = updatedMembers.length > 0 
      ? Math.round(totalProgress / updatedMembers.length) 
      : 0;

    onUpdateProject({
      teamMembers: updatedMembers,
      progress: newOverallProgress
    });
  };

  return (
    <div className="space-y-6">
      {/* SECTION 1: CORE PROJECT DETAILS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
        <div className="flex justify-between items-start border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                {projectData.code}
              </span>
              <h2 className="text-lg font-bold text-slate-800">{projectData.title}</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">{projectData.description}</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
            {projectData.status}
          </span>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Budget</span>
            <p className="font-extrabold text-slate-800 text-sm mt-0.5">${Number(projectData.budget).toLocaleString()}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Priority</span>
            <p className="font-extrabold text-slate-800 text-sm mt-0.5">{projectData.priority}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Project Manager</span>
            <p className="font-extrabold text-slate-800 text-sm mt-0.5">{projectData.projectManager}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-400 font-bold uppercase text-[10px]">PMO Lead</span>
            <p className="font-extrabold text-slate-800 text-sm mt-0.5">{projectData.pmoLead}</p>
          </div>
        </div>

        {/* OVERALL PROGRESS BAR */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-700">Overall Project Completion</span>
            <span className="text-blue-600">{projectData.progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${projectData.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: EMBEDDED TEAM MEMBERS & PROGRESS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              👥 Team Members & Task Progress
            </h3>
            <p className="text-xs text-slate-500">
              Track individual completion percentage and assigned task workloads
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddMember(!showAddMember)}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-2xs"
          >
            {showAddMember ? 'Cancel' : '+ Add Member'}
          </button>
        </div>

        {/* ADD MEMBER FORM */}
        {showAddMember && (
          <form onSubmit={handleAddMember} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-700">Add New Team Member</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <input
                type="text"
                placeholder="Member Name"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                className="bg-white border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Role (e.g. Developer)"
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                className="bg-white border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Assigned Task"
                value={newMember.assignedTask}
                onChange={(e) => setNewMember({ ...newMember, assignedTask: e.target.value })}
                className="bg-white border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Progress %"
                value={newMember.progress}
                onChange={(e) => setNewMember({ ...newMember, progress: e.target.value })}
                className="bg-white border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg"
              >
                Save Member
              </button>
            </div>
          </form>
        )}

        {/* TEAM MEMBER TABLE */}
        {(!projectData.teamMembers || projectData.teamMembers.length === 0) ? (
          <p className="text-xs text-slate-400 py-6 text-center">
            No team members assigned to this project yet. Click "+ Add Member" to add one.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <th className="p-3">Member Name</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Assigned Task</th>
                  <th className="p-3 w-48">Individual Progress</th>
                  <th className="p-3 text-center w-24">Update %</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projectData.teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-bold text-slate-800">{member.name}</td>
                    <td className="p-3 text-slate-600 font-medium">{member.role}</td>
                    <td className="p-3 text-slate-700">{member.assignedTask}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${
                              member.progress === 100
                                ? 'bg-emerald-500'
                                : member.progress > 50
                                ? 'bg-blue-600'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${member.progress}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-800 min-w-8 text-right">
                          {member.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={member.progress}
                        onChange={(e) => handleMemberProgressChange(member.id, e.target.value)}
                        className="w-16 border border-slate-300 rounded-lg px-2 py-1 text-center text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="p-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member.id)}
                        className="text-red-500 hover:text-red-700 font-semibold text-[11px]"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}