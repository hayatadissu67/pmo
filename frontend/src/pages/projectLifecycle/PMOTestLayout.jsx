import React, { useState } from 'react';
import ProjectDetails from './ProjectDetails';
import Milestones from './Milestones';
import ProjectFiles from './ProjectFiles';
import ProjectStatus from './ProjectStatus';
import Flow from './Flow';
import Phases from './Phases';
import CreateProject from './CreateProject';
import AIAssistant from '../aiProject/AIProjectPage';

export default function PMOTestLayout() {
  // Navigation active view state
  const [activePage, setActivePage] = useState('all-overview');

  // Dynamic phase selection state for Workflow view
  const [selectedWorkflowPhase, setSelectedWorkflowPhase] = useState('Execution');

  // Portfolio dataset with embedded team member progress
  const [projectsList, setProjectsList] = useState([
    {
      id: '1',
      code: 'PRJ-2026-001',
      title: 'Enterprise PMO Control Tower',
      description: 'System to streamline project planning, governance, and lifecycle monitoring.',
      budget: '150000',
      priority: 'High',
      projectManager: 'Alex Mercer',
      pmoLead: 'Sarah Jenkins',
      teamMembers: [
        { id: 'm1', name: 'John Doe', role: 'Backend Developer', progress: 80, assignedTask: 'Setup REST APIs' },
        { id: 'm2', name: 'Alice Smith', role: 'Frontend Engineer', progress: 65, assignedTask: 'Dashboard UI Integration' },
        { id: 'm3', name: 'Mark Vance', role: 'QA Lead', progress: 40, assignedTask: 'E2E Testing Scripts' }
      ],
      status: 'In Progress',
      progress: 62,
      phase: 'Execution'
    },
    {
      id: '2',
      code: 'PRJ-2026-002',
      title: 'Mobile Core Banking Integration',
      description: 'API gateway integration for real-time transactional services.',
      budget: '220000',
      priority: 'Urgent',
      projectManager: 'Elen Taylor',
      pmoLead: 'Sarah Jenkins',
      teamMembers: [
        { id: 'm4', name: 'David Kim', role: 'Backend Lead', progress: 50, assignedTask: 'OAuth2 Middleware' },
        { id: 'm5', name: 'Robert Lee', role: 'Security Analyst', progress: 30, assignedTask: 'Penetration Audit' }
      ],
      status: 'In Progress',
      progress: 40,
      phase: 'Design'
    },
    {
      id: '3',
      code: 'PRJ-2026-003',
      title: 'Cloud Infrastructure Migration',
      description: 'Transitioning legacy servers to cloud native containerized cluster.',
      budget: '95000',
      priority: 'Medium',
      projectManager: 'Carlos Ray',
      pmoLead: 'Michael Scott',
      teamMembers: [
        { id: 'm6', name: 'Frank Castle', role: 'DevOps Lead', progress: 100, assignedTask: 'Kubernetes Deployment' }
      ],
      status: 'Completed',
      progress: 100,
      phase: 'Closure'
    }
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState('1');
  const activeProject = projectsList.find((p) => p.id === selectedProjectId) || projectsList[0];

  // Navigate directly to Project Details
  const handleViewProjectDetails = (projectId, e) => {
    if (e) e.stopPropagation();
    setSelectedProjectId(projectId);
    setActivePage('details');
  };

  // Switch selected project and update workflow phase dynamically
  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
    const proj = projectsList.find((p) => p.id === projectId);
    if (proj) {
      setSelectedWorkflowPhase(proj.phase || 'Initiation');
    }
  };

  // Update active project
  const handleUpdateProject = (updated) => {
    setProjectsList((prev) =>
      prev.map((p) => (p.id === activeProject.id ? { ...p, ...updated } : p))
    );
  };

  // Update individual team member progress
  const handleMemberProgressChange = (memberId, newProgress) => {
    const validVal = Math.min(100, Math.max(0, Number(newProgress) || 0));

    const updatedMembers = activeProject.teamMembers.map((m) =>
      m.id === memberId ? { ...m, progress: validVal } : m
    );

    // Calculate project overall progress based on member average
    const totalMemberProgress = updatedMembers.reduce((acc, m) => acc + m.progress, 0);
    const newOverallProgress = updatedMembers.length > 0
      ? Math.round(totalMemberProgress / updatedMembers.length)
      : activeProject.progress;

    handleUpdateProject({
      teamMembers: updatedMembers,
      progress: newOverallProgress
    });
  };

  // Aggregates
  const totalProjects = projectsList.length;
  const avgProgress = Math.round(
    projectsList.reduce((acc, curr) => acc + curr.progress, 0) / totalProjects
  );
  const inProgressCount = projectsList.filter((p) => p.status === 'In Progress').length;
  const completedCount = projectsList.filter((p) => p.status === 'Completed').length;

  const lifecycleNav = [
    { id: 'all-overview', label: 'Portfolio Overview', icon: '📊' },
    { id: 'details', label: 'Project Details & Team', icon: '📋' },
    { id: 'milestones', label: 'Milestones', icon: '🚩' },
    { id: 'status', label: 'Project Status', icon: '📈' },
    { id: 'workflow', label: 'Phases & Workflow', icon: '🔄' },
    { id: 'files', label: 'Project Files', icon: '📁' },
    { id: 'ai', label: 'AI Project Assistant', icon: '🤖' },
    { id: 'create', label: 'Create Project', icon: '➕' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#0A3A82] text-white flex-shrink-0 flex flex-col justify-between z-20 shadow-lg">
        <div>
          <div className="p-5 border-b border-blue-900/50 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center font-black text-sm shadow-xs">
              PLC
            </div>
            <div>
              <h1 className="font-bold text-sm leading-tight text-white">Project Lifecycle</h1>
              <span className="text-[11px] text-blue-200">Project Manager Dashboard</span>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            {lifecycleNav.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    if (item.id === 'workflow') {
                      setSelectedWorkflowPhase(activeProject.phase);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs font-bold'
                      : 'text-blue-100 hover:bg-blue-800/50'
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* SELECTOR FOR ACTIVE PROJECT */}
        <div className="p-4 border-t border-blue-900/50 space-y-2">
          <label className="text-[10px] font-bold tracking-wider text-blue-300 uppercase block">
            Select Active Project
          </label>
          <select
            value={selectedProjectId}
            onChange={(e) => handleSelectProject(e.target.value)}
            className="w-full bg-blue-900/80 border border-blue-700/60 rounded-xl px-3 py-2 text-xs text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {projectsList.map((p) => (
              <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                {p.code} - {p.title}
              </option>
            ))}
          </select>

          <div className="bg-blue-900/40 rounded-lg p-2 border border-blue-700/30 flex justify-between items-center text-[11px]">
            <span className="text-blue-200">Overall Progress:</span>
            <span className="font-bold text-emerald-400">{activeProject.progress}%</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between flex-shrink-0 z-10">
          <div>
            <h2 className="text-base font-bold text-slate-800">
              {lifecycleNav.find((n) => n.id === activePage)?.label || 'Dashboard'}
            </h2>
            <p className="text-[11px] text-slate-500">
              Selected Project: <span className="font-semibold text-slate-700">{activeProject.title}</span> ({activeProject.code})
            </p>
          </div>

          <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
            Phase: {activeProject.phase}
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* VIEW 1: PORTFOLIO OVERVIEW */}
            {activePage === 'all-overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Projects</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl font-black text-slate-800">{totalProjects}</span>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Active</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Progress</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl font-black text-emerald-600">{avgProgress}%</span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Overall</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">In Progress</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl font-black text-blue-600">{inProgressCount}</span>
                      <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">Ongoing</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completed</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl font-black text-emerald-600">{completedCount}</span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Done</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                  <div className="p-5 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-800">Project Portfolio Roster</h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200">
                          <th className="p-3.5 pl-5">Code</th>
                          <th className="p-3.5">Project Title</th>
                          <th className="p-3.5">Manager</th>
                          <th className="p-3.5">Team Size</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 w-44">Progress</th>
                          <th className="p-3.5 text-right pr-5">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {projectsList.map((prj) => (
                          <tr key={prj.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3.5 pl-5 font-bold text-blue-900">{prj.code}</td>
                            <td className="p-3.5 font-semibold text-slate-800">{prj.title}</td>
                            <td className="p-3.5 text-slate-600">{prj.projectManager}</td>
                            <td className="p-3.5 font-semibold text-slate-700">{prj.teamMembers.length} Members</td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                {prj.status}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <div className="flex items-center gap-2">
                                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${prj.progress}%` }} />
                                </div>
                                <span className="font-bold text-slate-700 min-w-8 text-right">{prj.progress}%</span>
                              </div>
                            </td>
                            <td className="p-3.5 text-right pr-5">
                              <button
                                type="button"
                                onClick={(e) => handleViewProjectDetails(prj.id, e)}
                                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] shadow-2xs transition-all cursor-pointer"
                              >
                                View Members & Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: PROJECT DETAILS & INTEGRATED TEAM PROGRESS */}
            {activePage === 'details' && (
              <div className="space-y-6">
                {/* 1. Core Project Information */}
                <ProjectDetails projectData={activeProject} onUpdateProject={handleUpdateProject} />

                {/* 2. Integrated Team Members & Individual Progress Section */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-800">
                        👥 Team Members & Task Completion
                      </h3>
                      <p className="text-xs text-slate-500">
                        Track each team member's assigned responsibilities and individual completion progress
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg">
                      {activeProject.teamMembers.length} Active Members
                    </span>
                  </div>

                  {activeProject.teamMembers.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 text-center">No team members assigned to this project yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                            <th className="p-3">Member Name</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Assigned Task</th>
                            <th className="p-3 w-48">Progress</th>
                            <th className="p-3 text-right">Update %</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {activeProject.teamMembers.map((member) => (
                            <tr key={member.id} className="hover:bg-slate-50/80">
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
                              <td className="p-3 text-right">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={member.progress}
                                  onChange={(e) => handleMemberProgressChange(member.id, e.target.value)}
                                  className="w-16 border border-slate-300 rounded-lg px-2 py-1 text-center text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* OTHER SUB-VIEWS */}
            {activePage === 'milestones' && <Milestones projectCode={activeProject.code} />}

            {activePage === 'status' && (
              <ProjectStatus projectData={activeProject} onUpdateStatus={handleUpdateProject} />
            )}

            {/* VIEW 5: DYNAMIC FLOW & PHASES WORKFLOW */}
            {activePage === 'workflow' && (
              <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 space-y-6">
                <Flow 
                  activeProject={activeProject}
                  selectedPhase={selectedWorkflowPhase}
                  onSelectPhase={(phase) => setSelectedWorkflowPhase(phase)}
                />
                <Phases
                  activeProject={activeProject}
                  selectedPhase={selectedWorkflowPhase}
                  currentPhase={activeProject.phase}
                  onPhaseChange={(newPhase) => handleUpdateProject({ phase: newPhase })}
                  onUpdateProject={handleUpdateProject}
                />
              </div>
            )}

            {activePage === 'files' && <ProjectFiles projectCode={activeProject.code} />}

            {activePage === 'ai' && (
              <AIAssistant projectsList={projectsList} selectedProject={activeProject} />
            )}

            {activePage === 'create' && (
              <CreateProject
                onProjectCreated={(newProj) => {
                  const createdObj = {
                    ...newProj,
                    id: String(projectsList.length + 1),
                    progress: 0,
                    phase: 'Initiation',
                    status: 'Planning',
                    teamMembers: []
                  };
                  setProjectsList([...projectsList, createdObj]);
                  setSelectedProjectId(createdObj.id);
                  setSelectedWorkflowPhase('Initiation');
                  setActivePage('details');
                }}
              />
            )}

          </div>
        </main>
      </div>
    </div>
  );
}