import React, { useState } from 'react';

export default function Phases({ selectedPhase, activeProject, onUpdateProject }) {
  if (!activeProject) return null;

  const currentPhase = selectedPhase || activeProject.phase || 'Execution';
  const teamMembers = activeProject.teamMembers || [];

  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: '', assignedTask: '', progress: 0 });

  // Calculate live average progress
  const teamAvgProgress = teamMembers.length > 0 
    ? Math.round(teamMembers.reduce((acc, m) => acc + (Number(m.progress) || 0), 0) / teamMembers.length)
    : activeProject.progress || 0;

  // Handle member progress update
  const handleMemberProgressChange = (memberId, newProgress) => {
    const validVal = Math.min(100, Math.max(0, Number(newProgress) || 0));

    const updatedMembers = teamMembers.map((m) =>
      m.id === memberId ? { ...m, progress: validVal } : m
    );

    const newAvg = updatedMembers.length > 0
      ? Math.round(updatedMembers.reduce((acc, m) => acc + m.progress, 0) / updatedMembers.length)
      : 0;

    onUpdateProject({
      teamMembers: updatedMembers,
      progress: newAvg
    });
  };

  // Add new team member (Works for newly created projects!)
  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.role) return;

    const createdMember = {
      id: `m_${Date.now()}`,
      name: newMember.name,
      role: newMember.role,
      assignedTask: newMember.assignedTask || 'General Execution Task',
      progress: Number(newMember.progress) || 0
    };

    const updatedMembers = [...teamMembers, createdMember];
    const newAvg = Math.round(updatedMembers.reduce((acc, m) => acc + m.progress, 0) / updatedMembers.length);

    onUpdateProject({
      teamMembers: updatedMembers,
      progress: newAvg
    });

    setNewMember({ name: '', role: '', assignedTask: '', progress: 0 });
    setShowAddMember(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-800">{currentPhase} Phase Metrics</h3>
            {activeProject.phase === currentPhase && (
              <span className="text-[10px] font-extrabold bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
                ACTIVE PHASE
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Managing tasks and team deliverables for <span className="font-semibold text-slate-700">{activeProject.title}</span> ({activeProject.code})
          </p>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-4 min-w-52">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Phase Completion</span>
            <span className="text-xl font-black text-blue-700">{teamAvgProgress}%</span>
          </div>
          <div className="flex-1 bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${teamAvgProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* TEAM MEMBERS SECTION */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            👥 Team Members Driving This Phase ({teamMembers.length}):
          </h4>
          <button
            type="button"
            onClick={() => setShowAddMember(!showAddMember)}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all"
          >
            {showAddMember ? 'Cancel' : '+ Assign Member'}
          </button>
        </div>

        {/* ADD MEMBER FORM */}
        {showAddMember && (
          <form onSubmit={handleAddMember} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h5 className="text-xs font-bold text-slate-700">Assign Member to {activeProject.title}</h5>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <input
                type="text"
                placeholder="Name"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                className="bg-white border border-slate-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Role (e.g. Developer)"
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                className="bg-white border border-slate-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Assigned Task"
                value={newMember.assignedTask}
                onChange={(e) => setNewMember({ ...newMember, assignedTask: e.target.value })}
                className="bg-white border border-slate-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Progress %"
                value={newMember.progress}
                onChange={(e) => setNewMember({ ...newMember, progress: e.target.value })}
                className="bg-white border border-slate-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
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

        {/* MEMBER LIST */}
        {teamMembers.length === 0 ? (
          <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-6 text-center text-xs text-slate-400">
            No team members assigned to <span className="font-semibold text-slate-600">{activeProject.title}</span> yet. Click "+ Assign Member" to add one!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">{member.name}</span>
                  <span className="font-semibold text-slate-500">{member.role}</span>
                </div>
                <p className="text-[11px] text-slate-600">Task: {member.assignedTask}</p>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${member.progress}%` }}
                    />
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={member.progress}
                    onChange={(e) => handleMemberProgressChange(member.id, e.target.value)}
                    className="w-14 border border-slate-300 rounded px-1 text-center text-xs font-bold bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-xs font-bold text-slate-700">%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}