import React, { useState } from 'react';

export default function CreateRisk({ projectCode, onAddRisk }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technical');
  const [prob, setProb] = useState(2);
  const [imp, setImp] = useState(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const score = prob * imp;
    const severity = score >= 6 ? 'High' : score >= 3 ? 'Medium' : 'Low';

    const newRisk = {
      id: `RSK-${Math.floor(100 + Math.random() * 900)}`,
      projectCode,
      title,
      category,
      prob,
      imp,
      severity,
      status: 'Open'
    };

    if (onAddRisk) onAddRisk(newRisk);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="font-bold text-slate-800 text-sm">Log New Risk for {projectCode}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Risk Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. API Gateway rate limit throttling"
            className="w-full border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Technical">Technical</option>
            <option value="Governance">Governance</option>
            <option value="Resource">Resource</option>
            <option value="Security">Security</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Probability (1 = Low, 3 = High)</label>
          <select
            value={prob}
            onChange={(e) => setProb(Number(e.target.value))}
            className="w-full border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>1 - Low</option>
            <option value={2}>2 - Medium</option>
            <option value={3}>3 - High</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Impact (1 = Low, 3 = High)</label>
          <select
            value={imp}
            onChange={(e) => setImp(Number(e.target.value))}
            className="w-full border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>1 - Low</option>
            <option value={2}>2 - Medium</option>
            <option value={3}>3 - High</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-colors shadow-2xs"
      >
        Save Risk to Register
      </button>
    </form>
  );
}