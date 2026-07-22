import React, { useState } from 'react';
import ProjectNavbar from './ProjectNavbar';
import ProjectDetails from './ProjectDetails';
import ProjectMilestones from './Milestones';
import ProjectFiles from './ProjectFiles'; 
import ProjectStatus from './ProjectStatus';
import ProjectWorkflow from './Flow';
import CreateProject from './CreateProject';

export default function ProjectDashboard() {
  const [activePage, setActivePage] = useState('details');

  // Sample active project state
  const [activeProject, setActiveProject] = useState({
    code: 'PRJ-2026-001',
    name: 'University Student Portal Modernization',
    manager: 'Alex Mercer',
    status: 'In Progress',
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Top Navigation Bar */}
      <ProjectNavbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main View Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Render View Based On Active Tab */}
        {activePage === 'details' && (
          <ProjectDetails project={activeProject} />
        )}

        {activePage === 'milestones' && (
          <ProjectMilestones projectCode={activeProject.code} />
        )}

        {/* 👈 2. RENDER THE FILES COMPONENT HERE */}
        {activePage === 'files' && (
          <ProjectFiles projectCode={activeProject.code} />
        )}

        {activePage === 'status' && (
          <ProjectStatus projectCode={activeProject.code} />
        )}

        {activePage === 'workflow' && (
          <ProjectWorkflow projectCode={activeProject.code} />
        )}

        {activePage === 'create' && (
          <CreateProject onProjectCreated={() => setActivePage('details')} />
        )}

      </main>
    </div>
  );
}