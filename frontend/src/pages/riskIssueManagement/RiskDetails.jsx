import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function RiskDetails({ risk: initialRisk, onClose }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fallback mock data if accessed directly via URL route
  const risk = initialRisk || {
    id: id || 'R-101',
    title: 'Database Connection Timeout Under High Load',
    category: 'Infrastructure',
    severity: 'High',
    impact: 'High',
    status: 'Open',
    owner: 'System Architect',
    mitigation: 'Implement connection pooling and cache layer.',
    dateIdentified: '2026-07-01'
  };

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/risks');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            Risk Details
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Viewing Risk ID: <span className="font-bold text-blue-600">{risk.id}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={handleBack}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          ✕ Close / Back
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5 text-xs">
        <div>
          <span className="text-slate-400 font-bold block uppercase tracking-wider mb-1">
            Title / Summary
          </span>
          <h3 className="text-sm font-bold text-slate-800">{risk.title}</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <span className="text-slate-400 font-bold block mb-1">Category</span>
            <span className="font-semibold text-slate-700">{risk.category}</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold block mb-1">Severity</span>
            <span className="font-semibold text-amber-600">{risk.severity}</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold block mb-1">Impact</span>
            <span className="font-semibold text-red-600">{risk.impact}</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold block mb-1">Status</span>
            <span className="font-bold text-blue-600">{risk.status}</span>
          </div>
        </div>

        <div>
          <span className="text-slate-400 font-bold block uppercase tracking-wider mb-1">
            Mitigation Plan
          </span>
          <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200 font-medium">
            {risk.mitigation || 'No mitigation plan specified.'}
          </p>
        </div>

        <div className="flex justify-between items-center text-slate-500 pt-3 border-t border-slate-100">
          <span>Assigned Owner: <strong className="text-slate-700">{risk.owner}</strong></span>
          {risk.dateIdentified && <span>Identified Date: <strong className="text-slate-700">{risk.dateIdentified}</strong></span>}
        </div>
      </div>
    </div>
  );
}