import React, { useState } from 'react';
import { useRisks } from '../../context/RiskContext';

export default function ProjectRiskAssignment() {
  const { addRisk } = useRisks() || {};

  const [formData, setFormData] = useState({
    title: '',
    category: 'Technical',
    severity: 'Medium',
    owner: 'Project Manager',
    assignedRiskManager: 'Alex Mercer',
    mitigationPlan: '',
    impact: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert('Please enter a risk title.');

    if (typeof addRisk === 'function') {
      addRisk({
        ...formData,
        id: `RSK-${Math.floor(100 + Math.random() * 900)}`,
        status: 'Open'
      });
      setSuccessMessage('Risk successfully assigned and sent to Risk Manager UI!');
      setFormData({
        title: '',
        category: 'Technical',
        severity: 'Medium',
        owner: 'Project Manager',
        assignedRiskManager: 'Alex Mercer',
        mitigationPlan: '',
        impact: ''
      });
      setTimeout(() => setSuccessMessage(''), 4000);
    } else {
      alert('Error: Risk Provider is not connected properly.');
    }
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-6 sm:p-10 font-sans text-slate-800">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">
            Project Manager Portal
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Assign Risk to Risk Manager</h1>
          <p className="text-xs text-slate-500 mt-1">
            Fill out this form to log a project threat and delegate it directly to the Risk Management team.
          </p>
        </div>

        {successMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl animate-fade-in">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Risk Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., API integration delay"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 font-semibold text-slate-700"
              >
                <option value="Technical">Technical</option>
                <option value="Operational">Operational</option>
                <option value="Financial">Financial</option>
                <option value="Schedule">Schedule</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Severity</label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 font-semibold text-slate-700"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Project Owner / PM</label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Assign Risk Manager</label>
              <select
                name="assignedRiskManager"
                value={formData.assignedRiskManager}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-50/40 font-bold text-purple-700"
              >
                <option value="Alex Mercer">Alex Mercer</option>
                <option value="Sarah Jenkins">Sarah Jenkins</option>
                <option value="David Miller">David Miller</option>
                <option value="Elena Rostova">Elena Rostova</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Impact Description</label>
            <textarea
              name="impact"
              value={formData.impact}
              onChange={handleChange}
              rows="2"
              placeholder="What happens if this risk occurs?"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 font-medium"
            ></textarea>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Mitigation Plan</label>
            <textarea
              name="mitigationPlan"
              value={formData.mitigationPlan}
              onChange={handleChange}
              rows="2"
              placeholder="How will this risk be handled?"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 font-medium"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-md shadow-blue-500/20 transition-all text-xs tracking-wide uppercase"
          >
            Assign Risk to Risk Manager
          </button>
        </form>
      </div>
    </div>
  );
}