import React from 'react';

/**
 * PortfolioProgress Component
 * Tracks progress percentages and execution status for projects within the selected portfolio.
 */
export default function PortfolioProgress({ portfolioId }) {
  // Sample project execution data (In production, this can be fetched based on portfolioId)
  const projectsProgress = [
    { id: 1, name: 'User Management & Authentication', progress: 100, status: 'Completed', sprint: 'Sprint 2' },
    { id: 2, name: 'Project & Portfolio Management', progress: 80, status: 'In Progress', sprint: 'Sprint 3' },
    { id: 3, name: 'Document Vault & Approval Workflow', progress: 55, status: 'In Progress', sprint: 'Sprint 5' },
    { id: 4, name: 'Analytics & Reporting Module', progress: 30, status: 'In Progress', sprint: 'Sprint 6' },
  ];

  // Helper to color-code status badges
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-100 pb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Portfolio Progress</h3>
          <p className="text-xs text-gray-500">Execution tracking across active project milestones</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
          {projectsProgress.length} Projects
        </span>
      </div>

      {/* Progress Bars List */}
      <div className="space-y-4 pt-1">
        {projectsProgress.map((project) => (
          <div key={project.id} className="space-y-1.5">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">{project.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded font-medium ${getStatusBadge(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <span className="text-xs font-bold text-gray-600">{project.progress}%</span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-2.5 transition-all duration-300 rounded-full ${
                  project.progress === 100
                    ? 'bg-green-500'
                    : project.progress > 50
                    ? 'bg-blue-600'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${project.progress}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-gray-400 pt-0.5">
              <span>Target: {project.sprint}</span>
              <span>{project.progress === 100 ? 'Delivered' : 'On Schedule'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}