import React from 'react';

export default function RiskReport({ projectCode, risks = [] }) {
  const highRisks = risks.filter((r) => r.severity === 'High').length;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="font-bold text-slate-800 text-sm">Risk Executive Summary ({projectCode})</h3>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <span className="block text-slate-400">Total Risks</span>
          <span className="text-base font-bold text-slate-800">{risks.length}</span>
        </div>
        <div className="bg-rose-50 p-3 rounded-xl border border-rose-200">
          <span className="block text-rose-500">High Severity</span>
          <span className="text-base font-bold text-rose-700">{highRisks}</span>
        </div>
        <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
          <span className="block text-emerald-500">Status</span>
          <span className="text-base font-bold text-emerald-700">Healthy</span>
        </div>
      </div>
    </div>
  );
}