import React, { useState } from 'react';
import { useRisks } from '../../context/RiskContext';

export default function RiskPage() {
  const context = useRisks() || {};
  const risksList = context.risksList || [];
  const updateRiskStatus = context.updateRiskStatus || (() => {});

  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); 
  const [selectedRisk, setSelectedRisk] = useState(null); 

  const filteredRisks = risksList.filter((r) => {
    const matchSeverity = severityFilter === 'All' || r.severity === severityFilter;
    const matchStatus = statusFilter === 'All' || r.status === statusFilter;
    const matchTab = 
      activeTab === 'all' ? true :
      activeTab === 'critical' ? r.severity === 'Critical' || r.severity === 'High' :
      activeTab === 'assigned' ? r.assignedRiskManager === 'Alex Mercer' : true;

    const matchQuery =
      (r.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.owner || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.assignedRiskManager || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.category || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchSeverity && matchStatus && matchTab && matchQuery;
  });

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50/30 min-h-screen p-6 sm:p-10 overflow-y-auto font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-blue-900 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-2 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <span>🛡️</span> Enterprise Risk & Issue Governance
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Risk Register Command Center</h1>
            <p className="text-xs sm:text-sm text-blue-200/80 max-w-xl">
              Proactively track, assess, and mitigate project vulnerabilities, lifecycle threats, and delegated supervisor assignments in real time.
            </p>
          </div>

          <div className="flex items-center gap-3 z-10">
            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15 text-center shadow-inner">
              <span className="block text-[10px] uppercase font-bold text-blue-300 tracking-wider">Total Active</span>
              <span className="text-2xl font-black text-white">{risksList.length}</span>
            </div>
            <div className="bg-amber-500/20 backdrop-blur-md px-5 py-3 rounded-2xl border border-amber-400/30 text-center shadow-inner">
              <span className="block text-[10px] uppercase font-bold text-amber-300 tracking-wider">Critical Threat</span>
              <span className="text-2xl font-black text-amber-400">
                {risksList.filter(r => r.severity === 'Critical').length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1.5 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'all' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              📊 All Risks ({risksList.length})
            </button>
            <button
              onClick={() => setActiveTab('critical')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'critical' 
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              🔥 Critical & High
            </button>
            <button
              onClick={() => setActiveTab('assigned')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'assigned' 
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              👤 Assigned to Me (Alex)
            </button>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap justify-end">
            <div className="relative flex-1 sm:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-xs">🔍</span>
              <input
                type="text"
                placeholder="Search title, owner, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 font-medium"
              />
            </div>

            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="border border-slate-200 rounded-xl text-xs px-3 py-2 bg-slate-50/50 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">Severity: All</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-200 rounded-xl text-xs px-3 py-2 bg-slate-50/50 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">Status: All</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Mitigated">Mitigated</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/90 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <th className="p-4 pl-6">ID & Severity</th>
                  <th className="p-4">Risk Title & Category</th>
                  <th className="p-4">Owner / PM</th>
                  <th className="p-4">Assigned Risk Manager</th>
                  <th className="p-4">Mitigation Plan</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRisks.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-16 text-center text-slate-400 font-medium">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <span className="text-3xl">🔍</span>
                        <p className="text-sm font-bold text-slate-700">No matching risks found</p>
                        <p className="text-xs text-slate-400">Try switching tabs or resetting your filters.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRisks.map((risk) => (
                    <tr 
                      key={risk.id} 
                      className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                      onClick={() => setSelectedRisk(risk)}
                    >
                      <td className="p-4 pl-6 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-blue-900 bg-blue-50 px-2 py-1 rounded-lg text-[11px] border border-blue-100">
                            {risk.id}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wide ${
                            risk.severity === 'Critical' ? 'bg-rose-100 text-rose-700 border border-rose-200 animate-pulse' :
                            risk.severity === 'High' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                            'bg-blue-100 text-blue-700 border border-blue-200'
                          }`}>
                            {risk.severity}
                          </span>
                        </div>
                      </td>

                      <td className="p-4 max-w-xs">
                        <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                          {risk.title}
                        </p>
                        <span className="inline-block mt-1 text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          {risk.category}
                        </span>
                      </td>

                      <td className="p-4 font-semibold text-slate-700 whitespace-nowrap">
                        {risk.owner}
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl font-bold text-purple-700 bg-purple-50 border border-purple-100 shadow-2xs">
                          <span>👤</span> {risk.assignedRiskManager}
                        </span>
                      </td>

                      <td className="p-4 text-slate-600 max-w-xs truncate font-medium">
                        {risk.mitigationPlan}
                      </td>

                      <td className="p-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${
                          risk.status === 'Mitigated' ? 'bg-emerald-100 text-emerald-800' :
                          risk.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          ● {risk.status}
                        </span>
                      </td>

                      <td className="p-4 text-right pr-6 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={risk.status}
                          onChange={(e) => updateRiskStatus(risk.id, e.target.value)}
                          className="border border-slate-200 bg-white rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Mitigated">Mitigated</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedRisk && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                    {selectedRisk.id}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-2">{selectedRisk.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedRisk(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-sm transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 block font-bold uppercase text-[10px]">Severity</span>
                    <span className="font-bold text-slate-800 text-sm">{selectedRisk.severity}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold uppercase text-[10px]">Category</span>
                    <span className="font-bold text-slate-800 text-sm">{selectedRisk.category}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Impact Description</span>
                  <p className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl text-rose-900 font-medium">
                    {selectedRisk.impact || 'Standard project threat impact assessment.'}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Mitigation Strategy Plan</span>
                  <p className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-blue-900 font-medium">
                    {selectedRisk.mitigationPlan}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-slate-500 font-medium">
                  <span>Assigned RM: <strong className="text-purple-700">{selectedRisk.assignedRiskManager}</strong></span>
                  <span>Target Due: <strong>{selectedRisk.dueDate || '2026-11-30'}</strong></span>
                </div>
              </div>

              <button
                onClick={() => setSelectedRisk(null)}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-xs shadow-md transition-all"
              >
                Close Details
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}