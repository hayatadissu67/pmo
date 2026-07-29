import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditRisk({ risk: initialRisk, onSave, onCancel }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock initial state fallback if no prop or route param is present
  const activeRiskId = id || initialRisk?.id || 'R-101';

  const [formData, setFormData] = useState({
    id: activeRiskId,
    title: initialRisk?.title || '',
    category: initialRisk?.category || 'Technical',
    severity: initialRisk?.severity || 'Medium',
    impact: initialRisk?.impact || 'High',
    status: initialRisk?.status || 'Open',
    mitigation: initialRisk?.mitigation || '',
    owner: initialRisk?.owner || ''
  });

  // Prefill default mock data if accessed directly via URL route
  useEffect(() => {
    if (!initialRisk && id) {
      setFormData((prev) => ({
        ...prev,
        id,
        title: 'Database Connection Timeout Under High Load',
        category: 'Infrastructure',
        severity: 'High',
        impact: 'High',
        status: 'Open',
        mitigation: 'Implement connection pooling and cache layer.',
        owner: 'System Architect'
      }));
    }
  }, [id, initialRisk]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSave) {
      onSave(formData);
    } else {
      // Direct router navigation behavior when rendered as a full page route
      console.log('Updated Risk Data:', formData);
      navigate('/risks');
    }
  };

  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/risks');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            Edit Risk Record
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Updating Risk Identifier: <span className="font-bold text-blue-600">{formData.id}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={handleCancelClick}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          ✕ Back to List
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Risk Title */}
          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">
              Risk Title / Summary
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter risk summary"
              className="w-full border border-slate-300 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            />
          </div>

          {/* Risk Category */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
            >
              <option value="Technical">Technical</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Schedule">Schedule / Timeline</option>
              <option value="Budget">Budget / Financial</option>
              <option value="Resource">Resource / Staffing</option>
            </select>
          </div>

          {/* Risk Owner */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Assigned Owner
            </label>
            <input
              type="text"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              placeholder="e.g. Lead Developer"
              className="w-full border border-slate-300 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* Severity */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Severity Level
            </label>
            <select
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          {/* Impact */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Project Impact
            </label>
            <select
              name="impact"
              value={formData.impact}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">
              Risk Lifecycle Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer font-bold"
            >
              <option value="Open">Open</option>
              <option value="In Review">In Review</option>
              <option value="Mitigated">Mitigated</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Mitigation Strategy */}
          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">
              Mitigation Plan & Contingency Action
            </label>
            <textarea
              name="mitigation"
              rows={4}
              value={formData.mitigation}
              onChange={handleChange}
              placeholder="Detail the technical or procedural steps taken to reduce risk probability..."
              className="w-full border border-slate-300 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleCancelClick}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}