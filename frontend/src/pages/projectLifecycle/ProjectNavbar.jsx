import React from 'react';

export default function ProjectNavbar({ activePage, setActivePage }) {
  const navItems = [
    { id: 'details', label: 'Project Details', icon: '📋' },
    { id: 'milestones', label: 'Milestones', icon: '🚩', badge: '3' },
    { id: 'files', label: 'Project Files', icon: '📁' },
    { id: 'status', label: 'Status & Health', icon: '📊' },
    { id: 'workflow', label: 'Process Flow', icon: '🔄' },
  ];

  return (
    <div className="bg-white border-b border-slate-200/80 px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
      
      {/* Sub-module Label */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
          PMO
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-800 leading-none">Project Lifecycle</h2>
          <span className="text-[10px] text-slate-400 font-medium">Planning & Governance Module</span>
        </div>
      </div>

      {/* Clean Tab Controls */}
      <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage && setActivePage(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-white text-blue-600 shadow-2xs border border-slate-200/60 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="h-4 w-[1px] bg-slate-300/60 mx-1"></div>

        <button
          onClick={() => setActivePage && setActivePage('create')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
            activePage === 'create'
              ? 'bg-blue-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <span>➕</span>
          <span>Create Project</span>
        </button>
      </div>

    </div>
  );
}