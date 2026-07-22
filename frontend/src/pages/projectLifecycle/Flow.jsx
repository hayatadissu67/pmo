import React from 'react';
import ProjectNavbar from './ProjectNavbar';

const WORKFLOW_STEPS = [
  { stage: 'Business Need', actor: 'Client / Sponsor' },
  { stage: 'Project Request', actor: 'Business Analyst' },
  { stage: 'Business Case', actor: 'PM / Sponsor' },
  { stage: 'Portfolio Eval', actor: 'PMO Admin' },
  { stage: 'Project Approval', actor: 'Executive' },
  { stage: 'Initiation', actor: 'Project Manager' },
  { stage: 'Planning', actor: 'Project Manager' },
  { stage: 'Execution', actor: 'Team Members' },
  { stage: 'Monitoring', actor: 'PM / Risk Manager' },
  { stage: 'Closure', actor: 'PM / PMO Lead' },
];

export default function Flow({ activeStep = 6, standalone = false }) {
  const content = (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 max-w-5xl mx-auto overflow-x-auto space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">PMO End-to-End Business Workflow</h2>
        <p className="text-xs text-gray-500 mt-1">Lifecycle progression across standard PMO governance gates</p>
      </div>

      <div className="flex items-center min-w-[850px] justify-between py-4">
        {WORKFLOW_STEPS.map((step, index) => {
          const isDone = index < activeStep;
          const isCurrent = index === activeStep;

          return (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow'
                      : isDone
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <p className={`text-xs mt-2 font-semibold ${isCurrent ? 'text-blue-600' : 'text-gray-700'}`}>
                  {step.stage}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">{step.actor}</p>
              </div>

              {index < WORKFLOW_STEPS.length - 1 && (
                <div className={`h-1 flex-1 mx-1 ${index < activeStep ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return standalone ? (
    <div className="bg-gray-50 min-h-screen">
      <ProjectNavbar activePage="workflow" setActivePage={() => {}} />
      <div className="max-w-6xl mx-auto px-4">{content}</div>
    </div>
  ) : (
    content
  );
}