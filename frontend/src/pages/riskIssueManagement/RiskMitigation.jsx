import React, { useState } from 'react';

export default function RiskMitigation({ risk, onSaveStrategy }) {
  const [strategy, setStrategy] = useState('Avoidance');
  const [actionPlan, setActionPlan] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!actionPlan.trim()) return;

    if (onSaveStrategy) {
      onSaveStrategy({
        riskId: risk?.id,
        strategy,
        actionPlan,
      });
    }
    setActionPlan('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="font-bold text-slate-800 text-sm">Risk Mitigation Strategy</h3>
        <p className="text-xs text-slate-500">Define corrective action plans to reduce likelihood or impact</p>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Mitigation Strategy Type</label>
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="w-full border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Avoidance">Avoidance (Eliminate root cause)</option>
            <option value="Reduction">Mitigation / Reduction (Lower likelihood)</option>
            <option value="Transfer">Transfer (Insurance / Vendor contract)</option>
            <option value="Acceptance">Acceptance (Monitor without action)</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Action Plan & Control Measures</label>
          <textarea
            rows="3"
            value={actionPlan}
            onChange={(e) => setActionPlan(e.target.value)}
            placeholder="e.g. Implement automated circuit breakers and load balancers to prevent API rate exhaustion."
            className="w-full border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-colors"
      >
        Save Mitigation Plan
      </button>
    </form>
  );
}