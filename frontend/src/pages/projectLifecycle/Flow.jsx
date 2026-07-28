import React from 'react';

export default function Flow({ activeProject, selectedPhase, onSelectPhase }) {
  // Ordered array of phases in the lifecycle
  const phasesOrder = ['Initiation', 'Planning', 'Design', 'Execution', 'Monitoring', 'Closure'];

  // Identify where the current active phase sits in the index order
  const currentPhaseIndex = phasesOrder.indexOf(activeProject?.phase || 'Initiation');

  // Helper function to calculate phase percentage dynamically
  const getPhaseProgress = (phaseName, index) => {
    if (index < currentPhaseIndex) {
      // Past phases are 100% completed
      return 100;
    } else if (index === currentPhaseIndex) {
      // The current active phase uses the actual overall project/phase completion progress
      return activeProject?.progress || 0;
    } else {
      // Future phases have not started yet (0%)
      return 0;
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Interactive Lifecycle Flow
          </span>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Click any phase to view team progress for <span className="font-bold text-slate-700">{activeProject?.title}</span>
          </p>
        </div>

        {selectedPhase && (
          <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            Selected Phase: {selectedPhase}
          </span>
        )}
      </div>

      {/* Lifecycle Phase Nodes */}
      <div className="relative flex items-center justify-between px-4 py-2">
        {/* Connector Line behind nodes */}
        <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-100 -translate-y-1/2 z-0" />

        {phasesOrder.map((phaseName, index) => {
          const isCurrent = activeProject?.phase === phaseName;
          const isSelected = selectedPhase === phaseName;
          const isCompleted = index < currentPhaseIndex;
          const progressVal = getPhaseProgress(phaseName, index);

          return (
            <div
              key={phaseName}
              onClick={() => onSelectPhase(phaseName)}
              className="relative z-10 flex flex-col items-center cursor-pointer group"
            >
              {/* Node Circle */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xs transition-all duration-200 ${
                  isSelected
                    ? 'ring-4 ring-blue-200 scale-110 shadow-md'
                    : 'hover:scale-105'
                } ${
                  isCompleted
                    ? 'bg-emerald-500 text-white shadow-emerald-100'
                    : isCurrent
                    ? 'bg-blue-600 text-white shadow-blue-100'
                    : 'bg-white border-2 border-slate-200 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <span className="text-base">✓</span>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Node Label & Percentage Badge */}
              <div className="text-center mt-2 space-y-1">
                <span
                  className={`text-xs block font-bold transition-colors ${
                    isCurrent
                      ? 'text-blue-700'
                      : isCompleted
                      ? 'text-emerald-700'
                      : 'text-slate-500'
                  }`}
                >
                  {phaseName}
                </span>

                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full block w-max mx-auto ${
                    isCompleted
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      : isCurrent
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {progressVal}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}