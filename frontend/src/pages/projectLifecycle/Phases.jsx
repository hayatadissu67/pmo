import React from 'react';

export default function Phases({ currentPhase = 'Planning', onPhaseChange }) {
  const lifecyclePhases = [
    { name: 'Initiation', desc: 'Scope definition & charter sign-off', icon: '🚀' },
    { name: 'Planning', desc: 'Architecture, baseline & milestone setup', icon: '📐' },
    { name: 'Execution', desc: 'Development, deliverables & testing', icon: '⚙️' },
    { name: 'Closure', desc: 'Final PMO audit, lessons & sign-off', icon: '🏁' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
          Lifecycle Phase Transition
        </h3>
        <span className="text-[11px] text-slate-400">Click a phase to update governance gate</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {lifecyclePhases.map((phase) => {
          const isActive = currentPhase === phase.name;
          return (
            <button
              key={phase.name}
              onClick={() => onPhaseChange && onPhaseChange(phase.name)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-400/30 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{phase.icon}</span>
                {isActive && (
                  <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </div>
              <h4 className="text-xs font-bold text-slate-800">{phase.name}</h4>
              <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{phase.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}