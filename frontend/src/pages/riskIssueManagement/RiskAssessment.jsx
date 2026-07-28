import React from 'react';

export default function RiskAssessment({ risk }) {
  if (!risk) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 text-center text-xs text-slate-400">
        Select a risk to evaluate its qualitative & quantitative assessment.
      </div>
    );
  }

  const score = risk.prob * risk.imp;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
      <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Risk Assessment: {risk.id}</h3>
          <p className="text-xs text-slate-500">{risk.title}</p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
          score >= 6 ? 'bg-rose-100 text-rose-700 border border-rose-200' : 'bg-amber-100 text-amber-700'
        }`}>
          Score: {score} / 9
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <span className="block font-bold text-slate-700 mb-1">Likelihood Rating</span>
          <p className="text-slate-500">
            Level {risk.prob} ({risk.prob === 3 ? 'High Probability' : risk.prob === 2 ? 'Moderate' : 'Unlikely'})
          </p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <span className="block font-bold text-slate-700 mb-1">Business Impact</span>
          <p className="text-slate-500">
            Level {risk.imp} ({risk.imp === 3 ? 'Severe Project Delay / Cost' : risk.imp === 2 ? 'Moderate Impact' : 'Low Impact'})
          </p>
        </div>
      </div>
    </div>
  );
}