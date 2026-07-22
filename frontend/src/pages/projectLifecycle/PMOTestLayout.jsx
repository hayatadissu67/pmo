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
  // Navigation active view: 'all-overview', 'details', 'milestones', 'status', 'workflow', 'files', 'create', 'ai'
  const [activePage, setActivePage] = useState('all-overview');

  // Multi-project dataset for PM portfolio oversight
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
      teamMembers: ['John Doe (Dev)', 'Alice Smith (Frontend)', 'Mark Vance (QA)'],
      status: 'In Progress',
      progress: 68,
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
      teamMembers: ['David Kim (Backend)', 'Robert Lee (Security)'],
      status: 'In Progress',
      progress: 42,
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
      teamMembers: ['Frank Castle (DevOps)'],
      status: 'Completed',
      progress: 100,
      phase: 'Closure'
    },
    {
      id: '4',
      code: 'PRJ-2026-004',
      title: 'AI Customer Portal & Chatbot',
      description: 'LLM integration for automated ticket routing and support.',
      budget: '180000',
      priority: 'High',
      projectManager: 'Alex Mercer',
      pmoLead: 'Sarah Jenkins',
      teamMembers: ['Sam Wilson (AI)', 'Grace Hopper (ML)'],
      status: 'Planning',
      progress: 15,
      phase: 'Initiation'
    }
  ]);

  // Selected project state
  const [selectedProjectId, setSelectedProjectId] = useState('1');
  const activeProject = projectsList.find((p) => p.id === selectedProjectId) || projectsList[0];

  // Helper to update active project in the list
  const handleUpdateProject = (updated) => {
    setProjectsList((prev) =>
      prev.map((p) => (p.id === activeProject.id ? { ...p, ...updated } : p))
    );
  };

  // Metrics for PM Executive Summary
  const totalProjects = projectsList.length;
  const avgProgress = Math.round(
    projectsList.reduce((acc, curr) => acc + curr.progress, 0) / totalProjects
  );
  const inProgressCount = projectsList.filter((p) => p.status === 'In Progress').length;
  const completedCount = projectsList.filter((p) => p.status === 'Completed').length;

  // Sidebar navigation items (includes AI Assistant)
  const lifecycleNav = [
    { id: 'all-overview', label: 'Portfolio Overview', icon: '📊' },
    { id: 'details', label: 'Project Details', icon: '📋' },
    { id: 'milestones', label: 'Milestones', icon: '🚩' },
    { id: 'status', label: 'Project Status', icon: '📈' },
    { id: 'workflow', label: 'Phases & Workflow', icon: '🔄' },
    { id: 'files', label: 'Project Files', icon: '📁' },
    { id: 'ai', label: 'AI Project Assistant', icon: '🤖' },
    { id: 'create', label: 'Create Project', icon: '➕' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
      
      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-[#0A3A82] text-white flex-shrink-0 flex flex-col justify-between z-20 shadow-lg">
        <div>
          {/* Header */}
          <div className="p-5 border-b border-blue-900/50 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center font-black text-sm shadow-xs">
              PLC
            </div>
            <div>
              <h1 className="font-bold text-sm leading-tight text-white">Project Lifecycle</h1>
              <span className="text-[11px] text-blue-200">Manager Control Panel</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {lifecycleNav.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
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

        {/* Project Selector Box in Sidebar */}
        <div className="p-4 border-t border-blue-900/50 space-y-2">
          <label className="text-[10px] font-bold tracking-wider text-blue-300 uppercase block">
            Select Active Project
          </label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full bg-blue-900/80 border border-blue-700/60 rounded-xl px-3 py-2 text-xs text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {projectsList.map((p) => (
              <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                {p.code} - {p.title}
              </option>
            ))}
          </select>
          
          <div className="bg-blue-900/40 rounded-lg p-2 border border-blue-700/30 flex justify-between items-center text-[11px]">
            <span className="text-blue-200">Progress:</span>
            <span className="font-bold text-emerald-400">{activeProject.progress}%</span>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header */}
        <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between flex-shrink-0 z-10">
          <div>
            <h2 className="text-base font-bold text-slate-800">
              {lifecycleNav.find((n) => n.id === activePage)?.label || 'Dashboard'}
            </h2>
            <p className="text-[11px] text-slate-500">
              Selected Project: <span className="font-semibold text-slate-700">{activeProject.title}</span> ({activeProject.code})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
              Overall Phase: {activeProject.phase}
            </span>
          </div>
        </header>

        {/* Dynamic Viewport */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* PORTFOLIO OVERVIEW */}
            {activePage === 'all-overview' && (
              <div className="space-y-6">
                
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Managed</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl font-black text-slate-800">{totalProjects}</span>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Projects</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Portfolio Progress</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl font-black text-emerald-600">{avgProgress}%</span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Average</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">In Progress</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl font-black text-blue-600">{inProgressCount}</span>
                      <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">Active</span>
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

                {/* Progress Breakdown */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">All Projects Progress Breakdown</h3>
                      <p className="text-xs text-slate-500">Real-time completion percentage per active lifecycle project</p>
                    </div>
                    <span className="text-xs font-medium text-slate-400">{projectsList.length} total projects</span>
                  </div>

                  <div className="space-y-4 pt-2">
                    {projectsList.map((prj) => (
                      <div key={prj.id} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="font-bold text-slate-700">{prj.code} - {prj.title}</span>
                          <span className="font-bold text-blue-600">{prj.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              prj.progress === 100
                                ? 'bg-emerald-500'
                                : prj.progress > 50
                                ? 'bg-blue-600'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${prj.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects Table */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                  <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-800">Manager Portfolio Matrix</h3>
                    <span className="text-xs text-slate-400">Click "Select & View" to inspect details</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200">
                          <th className="p-3.5 pl-5">Code</th>
                          <th className="p-3.5">Project Title</th>
                          <th className="p-3.5">Manager</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5">Phase</th>
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
                            <td className="p-3.5">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  prj.status === 'Completed'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : prj.status === 'In Progress'
                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}
                              >
                                {prj.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-slate-500 font-medium">{prj.phase}</td>
                            <td className="p-3.5">
                              <div className="flex items-center gap-2">
                                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${prj.progress}%` }}
                                  />
                                </div>
                                <span className="font-bold text-slate-700 min-w-8 text-right">{prj.progress}%</span>
                              </div>
                            </td>
                            <td className="p-3.5 text-right pr-5">
                              <button
                                onClick={() => {
                                  setSelectedProjectId(prj.id);
                                  setActivePage('details');
                                }}
                                className="px-3 py-1 bg-blue-600 text-white rounded-lg font-bold text-[11px] shadow-2xs hover:bg-blue-700 transition-colors"
                              >
                                Select & View
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

            {/* PROJECT DETAILS VIEW */}
            {activePage === 'details' && (
              <ProjectDetails
                projectData={activeProject}
                onUpdateProject={handleUpdateProject}
              />
            )}

            {/* MILESTONES VIEW */}
            {activePage === 'milestones' && (
              <Milestones projectCode={activeProject.code} />
            )}

            {/* STATUS VIEW */}
            {activePage === 'status' && (
              <ProjectStatus
                projectData={activeProject}
                onUpdateStatus={handleUpdateProject}
              />
            )}

            {/* PHASES & WORKFLOW VIEW */}
            {activePage === 'workflow' && (
              <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 space-y-6">
                <Flow activeStep={6} />
                <Phases
                  currentPhase={activeProject.phase}
                  onPhaseChange={(newPhase) => handleUpdateProject({ phase: newPhase })}
                />
              </div>
            )}

            {/* FILES VIEW */}
            {activePage === 'files' && (
              <ProjectFiles projectCode={activeProject.code} />
            )}

            {/* AI ASSISTANT VIEW */}
            {activePage === 'ai' && (
              <AIAssistant
                projectsList={projectsList}
                selectedProject={activeProject}
              />
            )}

            {/* CREATE PROJECT VIEW */}
            {activePage === 'create' && (
              <CreateProject
                onProjectCreated={(newProj) => {
                  const createdObj = {
                    ...newProj,
                    id: String(projectsList.length + 1),
                    progress: 0,
                    phase: 'Initiation',
                    status: 'Planning'
                  };
                  setProjectsList([...projectsList, createdObj]);
                  setSelectedProjectId(createdObj.id);
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