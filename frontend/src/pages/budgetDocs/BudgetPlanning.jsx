import React, { useState } from 'react';

export default function BudgetPlanning() {
  const [plans, setPlans] = useState([
    { 
      id: 1, 
      planName: 'Q1 Cloud Upgrade', 
      projectName: 'PMO Control Tower', 
      category: 'Infrastructure', 
      estimatedCost: 25000, 
      timeline: '2026-08-01' 
    },
  ]);

  const [newPlan, setNewPlan] = useState({
    planName: '',
    projectName: '',
    category: '',
    estimatedCost: '',
    timeline: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan({ ...newPlan, [name]: value });
  };

  const handleSaveBudgetPlan = (e) => {
    e.preventDefault();
    if (!newPlan.planName || !newPlan.estimatedCost) return;

    const plan = {
      id: plans.length + 1,
      ...newPlan,
      estimatedCost: parseFloat(newPlan.estimatedCost),
    };

    setPlans([plan, ...plans]);
    setNewPlan({
      planName: '',
      projectName: '',
      category: '',
      estimatedCost: '',
      timeline: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Budget Planning</h1>
          <p className="text-sm text-gray-500">Create budget plans, assign categories, and manage project timelines.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Budget Plan Form */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Create Budget Plan</h3>
          <form onSubmit={handleSaveBudgetPlan} className="space-y-4 text-sm">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Budget Plan Name *</label>
              <input
                type="text"
                name="planName"
                value={newPlan.planName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Fkn: Phase 1 Core Dev"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Project Budget / Project Name *</label>
              <input
                type="text"
                name="projectName"
                value={newPlan.projectName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Fkn: PMO Tower"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Budget Categories *</label>
              <input
                type="text"
                name="category"
                value={newPlan.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Fkn: Software & Tools"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Estimated Costs ($) *</label>
              <input
                type="number"
                name="estimatedCost"
                value={newPlan.estimatedCost}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Budget Timeline *</label>
              <input
                type="date"
                name="timeline"
                value={newPlan.timeline}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Save Budget Plan
            </button>
          </form>
        </div>

        {/* Budget Planning List Table */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Planned Projects & Estimated Costs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b text-gray-400 uppercase text-xs">
                  <th className="pb-3 font-medium">Plan Name</th>
                  <th className="pb-3 font-medium">Project Name</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Timeline</th>
                  <th className="pb-3 font-medium text-right">Estimated Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {plans.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-800">{item.planName}</td>
                    <td className="py-3 text-gray-600">{item.projectName}</td>
                    <td className="py-3 text-gray-500">
                      <span className="bg-purple-50 text-purple-600 px-2 py-1 rounded text-xs font-semibold">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500">{item.timeline}</td>
                    <td className="py-3 text-right font-bold text-gray-800">${item.estimatedCost.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}