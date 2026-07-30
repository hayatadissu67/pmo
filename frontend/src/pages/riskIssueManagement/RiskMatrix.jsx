import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_RISKS = [
  { id: 'R-101', title: 'Database Connection Timeout', impact: 4, likelihood: 4, category: 'Technical' },
  { id: 'R-102', title: 'API Rate Limiting Bottleneck', impact: 3, likelihood: 2, category: 'Infrastructure' },
  { id: 'R-103', title: 'Security Auth Vulnerability', impact: 5, likelihood: 3, category: 'Security' },
  { id: 'R-104', title: 'UI Responsiveness Issues', impact: 2, likelihood: 4, category: 'Frontend' },
  { id: 'R-105', title: 'Third-party Payment Gateway Downtime', impact: 5, likelihood: 1, category: 'Integration' }
];

export default function RiskMatrix() {
  const navigate = useNavigate();
  const [risks] = useState(DEFAULT_RISKS);
  const [selectedCell, setSelectedCell] = useState(null);

  // Get risk score color based on matrix severity
  const getSeverityBg = (impact, likelihood) => {
    const score = impact * likelihood;
    if (score >= 15) return 'bg-red-500 text-white';
    if (score >= 8) return 'bg-amber-400 text-slate-900';
    return 'bg-emerald-400 text-slate-900';
  };

  const getCellRisks = (impact, likelihood) => {
    return risks.filter((r) => r.impact === impact && r.likelihood === likelihood);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            Risk Probability & Impact Matrix
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Visualize and prioritize risks based on likelihood and severity
          </p>
        </div>

        <button
          onClick={() => navigate('/risks')}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
        >
          ← Back to Risk Register
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 5x5 Matrix Grid */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500">
            <span>Impact (1 = Very Low, 5 = Critical) →</span>
            <span>↑ Likelihood</span>
          </div>

          <div className="grid grid-cols-6 gap-1.5 text-center text-xs font-bold">
            {/* Header row for Impact */}
            <div className="p-2 text-slate-400">L / I</div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                I-{i}
              </div>
            ))}

            {/* Matrix Rows (Likelihood 5 down to 1) */}
            {[5, 4, 3, 2, 1].map((likelihood) => (
              <React.Fragment key={likelihood}>
                <div className="p-2 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center">
                  L-{likelihood}
                </div>
                {[1, 2, 3, 4, 5].map((impact) => {
                  const cellRisks = getCellRisks(impact, likelihood);
                  const isSelected =
                    selectedCell?.impact === impact && selectedCell?.likelihood === likelihood;

                  return (
                    <button
                      key={`${likelihood}-${impact}`}
                      onClick={() => setSelectedCell({ impact, likelihood, risks: cellRisks })}
                      className={`h-14 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer border ${getSeverityBg(
                        impact,
                        likelihood
                      )} ${isSelected ? 'ring-4 ring-blue-500 scale-105 z-10 shadow-md' : 'border-transparent hover:opacity-90'}`}
                    >
                      <span className="text-xs font-black">{impact * likelihood}</span>
                      {cellRisks.length > 0 && (
                        <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded-full mt-0.5 font-extrabold">
                          {cellRisks.length} Risk{cellRisks.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 pt-3 text-xs font-bold text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400" /> Low (1–6)
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400" /> Medium (8–12)
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" /> Critical (15–25)
            </div>
          </div>
        </div>

        {/* Selected Cell Detail Panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
            Cell Inspection
          </h3>

          {!selectedCell ? (
            <p className="text-xs text-slate-400 py-8 text-center">
              Click any matrix cell to view mapped risks.
            </p>
          ) : (
            <div className="space-y-3">
              <div className="text-xs space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-700">
                  Impact Rating: <span className="text-blue-600">{selectedCell.impact}</span>
                </p>
                <p className="font-bold text-slate-700">
                  Likelihood Rating: <span className="text-blue-600">{selectedCell.likelihood}</span>
                </p>
                <p className="font-bold text-slate-700">
                  Combined Score:{' '}
                  <span className="text-emerald-700">
                    {selectedCell.impact * selectedCell.likelihood}
                  </span>
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Mapped Risks ({selectedCell.risks.length})
                </h4>
                {selectedCell.risks.length === 0 ? (
                  <p className="text-xs text-slate-400 py-3">No risks currently assigned to this rating.</p>
                ) : (
                  selectedCell.risks.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => navigate(`/riskissuemanagenet/RiskDetails/${r.id}`)}
                      className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl transition-all cursor-pointer space-y-1 text-xs"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-blue-600">{r.id}</span>
                        <span className="text-[10px] font-semibold text-slate-500">{r.category}</span>
                      </div>
                      <p className="font-bold text-slate-800">{r.title}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}