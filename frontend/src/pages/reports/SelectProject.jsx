import React, { useState } from 'react';

const mockProjects = [
  { id: 'proj-1', name: 'PMO Control Tower', key: 'PCT', status: 'Active' },
  { id: 'proj-2', name: 'Document Management Platform', key: 'DMP', status: 'Active' },
  { id: 'proj-3', name: 'Enterprise Resource System', key: 'ERS', status: 'In Review' },
  { id: 'proj-4', name: 'Core Infrastructure Upgrade', key: 'CIU', status: 'Planning' },
];

export default function SelectProject({ selectedProject, onSelectProject }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-1">1. Select Project</h3>
      <p className="text-xs text-gray-500 mb-4">Choose the project data to include in your generated report.</p>

      <div className="space-y-2">
        {mockProjects.map((project) => {
          const isSelected = selectedProject === project.id;
          return (
            <div
              key={project.id}
              onClick={() => onSelectProject && onSelectProject(project.id)}
              className={`p-3 rounded-lg border cursor-pointer transition flex justify-between items-center ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-medium'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div>
                <span className="text-xs font-mono px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 mr-2">
                  {project.key}
                </span>
                <span className="text-sm">{project.name}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                project.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {project.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}