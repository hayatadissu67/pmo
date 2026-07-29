import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const INITIAL_RISKS = [
  {
    id: 'R-101',
    title: 'Database Connection Timeout Under High Load',
    category: 'Infrastructure',
    severity: 'High',
    impact: 'High',
    status: 'Open',
    owner: 'System Architect',
    dateIdentified: '2026-07-01'
  },
  {
    id: 'R-102',
    title: 'API Integration Rate Limiting Bottleneck',
    category: 'Technical',
    severity: 'Medium',
    impact: 'Medium',
    status: 'In Review',
    owner: 'Backend Lead',
    dateIdentified: '2026-07-10'
  },
  {
    id: 'R-103',
    title: 'Deployment Pipeline Security Vulnerability',
    category: 'Security',
    severity: 'Critical',
    impact: 'High',
    status: 'Open',
    owner: 'DevOps Engineer',
    dateIdentified: '2026-07-15'
  }
];

export default function RiskList() {
  const [risks, setRisks] = useState(INITIAL_RISKS);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredRisks = risks.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            Risk Register
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track, review, and manage active project risks
          </p>
        </div>

        <button
          onClick={() => navigate('/riskissuemanagenet/createRisk')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
        >
          + Add New Risk
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <input
          type="text"
          placeholder="Search by ID, title, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md border border-slate-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-xs font-bold text-slate-400">
          Showing {filteredRisks.length} Risk(s)
        </span>
      </div>

      {/* Risk Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Severity</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {filteredRisks.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-400">
                  No risk records match your query.
                </td>
              </tr>
            ) : (
              filteredRisks.map((risk) => (
                <tr key={risk.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-blue-600">{risk.id}</td>
                  <td className="p-4 font-bold text-slate-800">{risk.title}</td>
                  <td className="p-4">{risk.category}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full font-extrabold text-[10px] ${
                      risk.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                      risk.severity === 'High' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {risk.severity}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-blue-700">{risk.status}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => navigate(`/riskissuemanagenet/RiskDetails/${risk.id}`)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all cursor-pointer"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/riskissuemanagenet/EditRisk/${risk.id}`)}
                      className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg transition-all cursor-pointer"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}