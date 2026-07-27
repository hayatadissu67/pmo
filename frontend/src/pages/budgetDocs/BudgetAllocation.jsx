import React, { useState } from 'react';

export default function BudgetAllocation() {
  const [allocations, setAllocations] = useState([
    { id: 1, dept: 'Cloud & Infrastructure', allocated: 20000, project: 'PMO Tower' },
    { id: 2, dept: 'Human Resources', allocated: 35000, project: 'Team Stipends' },
  ]);

  const [history, setHistory] = useState([
    { id: 1, action: 'Initial Allocation', project: 'PMO Tower', amount: '$20,000', date: '2026-07-10 10:30 AM', user: 'Admin' },
    { id: 2, action: 'Initial Allocation', project: 'Team Stipends', amount: '$35,000', date: '2026-07-12 02:15 PM', user: 'Manager' },
  ]);

  const [selectedProject, setSelectedProject] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const handleUpdateAllocation = (e) => {
    e.preventDefault();
    if (!selectedProject || !newAmount) return;

    // Update allocation amount
    setAllocations(allocations.map(item => 
      item.project === selectedProject ? { ...item, allocated: Number(newAmount) } : item
    ));

    // Add to history
    const newHistoryItem = {
      id: history.length + 1,
      action: 'Updated Allocation',
      project: selectedProject,
      amount: `$${Number(newAmount).toLocaleString()}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      user: 'Current User'
    };
    setHistory([newHistoryItem, ...history]);
    setSelectedProject('');
    setNewAmount('');
  };

  return (
    <div className="space-y-6">
      {/* Original Existing Content */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Department & Project Allocation</h3>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b text-gray-400">
              <th className="pb-3 font-medium">Department</th>
              <th className="pb-3 font-medium">Project</th>
              <th className="pb-3 font-medium text-right">Allocated Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {allocations.map(a => (
              <tr key={a.id}>
                <td className="py-3 font-medium text-gray-800">{a.dept}</td>
                <td className="py-3 text-gray-500">{a.project}</td>
                <td className="py-3 text-right font-bold">${a.allocated.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Allocation Section */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Update Allocation</h3>
        <p className="text-sm text-gray-500 mb-4">Modify existing budget amounts assigned to specific projects.</p>
        
        <form onSubmit={handleUpdateAllocation} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select 
            value={selectedProject} 
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          >
            <option value="">Select Project to Update</option>
            {allocations.map((item) => (
              <option key={item.id} value={item.project}>{item.project}</option>
            ))}
          </select>

          <input 
            type="number" 
            placeholder="New Allocated Amount ($)"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />

          <button 
            type="submit"
            className="py-2.5 px-4 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Update Allocation
          </button>
        </form>
      </div>

      {/* Allocation History Section */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Allocation History</h3>
          <p className="text-xs text-gray-500 mt-0.5">Log of previous adjustments and creation records.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b text-gray-400 bg-gray-50">
                <th className="py-3 px-4 font-medium">Action</th>
                <th className="py-3 px-4 font-medium">Project Name</th>
                <th className="py-3 px-4 font-medium">Amount</th>
                <th className="py-3 px-4 font-medium">Timestamp</th>
                <th className="py-3 px-4 font-medium">Modified By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.map((h) => (
                <tr key={h.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-gray-800">{h.action}</td>
                  <td className="py-3 px-4 text-gray-600">{h.project}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">{h.amount}</td>
                  <td className="py-3 px-4 text-gray-500 text-xs">{h.date}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {h.user}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}