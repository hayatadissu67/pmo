import React, { useState } from 'react';

export default function AddBudget({ onAddBudget }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    amount: '',
    timeline: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    if (onAddBudget) {
      onAddBudget({
        id: Date.now(),
        ...formData,
        amount: parseFloat(formData.amount),
      });
    }

    setFormData({ title: '', category: '', amount: '', timeline: '' });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100 max-w-lg mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Budget Plan</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Budget Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Fkn: Cloud Migration Phase 1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Fkn: Infrastructure"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Timeline / Date</label>
          <input
            type="date"
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 text-sm transition"
        >
          Save Budget
        </button>
      </form>
    </div>
  );
}