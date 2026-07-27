import React, { useState } from 'react';

export default function Overview() {
  const [metrics] = useState({
    totalBudget: 150000,
    budgetUtilization: 68.5,
    remainingBudget: 47250,
  });

  const [recentExpenses] = useState([
    { id: 1, title: 'AWS Cloud Hosting', category: 'Infrastructure', amount: 1200, date: '2026-07-20' },
    { id: 2, title: 'Figma Subscriptions', category: 'Software', amount: 150, date: '2026-07-21' },
  ]);

  const [budgetAlerts] = useState([
    { id: 1, message: 'Software category is nearing its allocated limit (90% spent).', type: 'warning' },
  ]);

  // Modal States
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  // Expense Form State
  const [expenseData, setExpenseData] = useState({
    expenseName: '',
    projectName: '',
    expenseCategory: '',
    amount: '',
    expenseDate: '',
    vendor: '',
    paymentMethod: 'Bank Transfer',
    description: '',
    receipt: null,
  });

  const handleExpenseChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'receipt') {
      setExpenseData({ ...expenseData, receipt: files[0] });
    } else {
      setExpenseData({ ...expenseData, [name]: value });
    }
  };

  const handleSaveExpense = (e) => {
    e.preventDefault();
    console.log('Saved Expense:', expenseData);
    setIsExpenseModalOpen(false);
  };

  return (
    <div className="space-y-6 relative">
      
      {/* 1. Quick Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl shadow border border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Dashboard & Quick Actions</h2>
          <p className="text-xs text-gray-500">Manage your quick tasks and monitor real-time indicators.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsBudgetModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition"
          >
            + Create Budget Plan
          </button>
          <button 
            onClick={() => setIsExpenseModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-green-700 transition"
          >
            + Record Expense
          </button>
        </div>
      </div>

      {/* 2. Record Expense Modal / Popup */}
      {isExpenseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Record New Expense</h3>
            
            <form onSubmit={handleSaveExpense} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Expense Name *</label>
                  <input
                    type="text"
                    name="expenseName"
                    value={expenseData.expenseName}
                    onChange={handleExpenseChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Fkn: Cloud Hosting"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Project Name *</label>
                  <input
                    type="text"
                    name="projectName"
                    value={expenseData.projectName}
                    onChange={handleExpenseChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Fkn: PMO Tower"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Expense Category *</label>
                  <input
                    type="text"
                    name="expenseCategory"
                    value={expenseData.expenseCategory}
                    onChange={handleExpenseChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Fkn: Infrastructure"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Amount *</label>
                  <input
                    type="number"
                    name="amount"
                    value={expenseData.amount}
                    onChange={handleExpenseChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Expense Date *</label>
                  <input
                    type="date"
                    name="expenseDate"
                    value={expenseData.expenseDate}
                    onChange={handleExpenseChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Paid To / Vendor *</label>
                  <input
                    type="text"
                    name="vendor"
                    value={expenseData.vendor}
                    onChange={handleExpenseChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Fkn: AWS Inc."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Payment Method *</label>
                <select
                  name="paymentMethod"
                  value={expenseData.paymentMethod}
                  onChange={handleExpenseChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  name="description"
                  rows="3"
                  value={expenseData.description}
                  onChange={handleExpenseChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Details about the expense..."
                  required
                ></textarea>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Receipt (Optional Upload)</label>
                <input
                  type="file"
                  name="receipt"
                  onChange={handleExpenseChange}
                  className="w-full text-xs text-gray-500 border border-gray-300 rounded-lg p-2"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsExpenseModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Budget Alerts */}
      <div className="space-y-2">
        {budgetAlerts.map((alert) => (
          <div key={alert.id} className="p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg text-xs flex justify-between items-center">
            <span className="font-medium">⚠️ Alert: {alert.message}</span>
            <button className="underline font-semibold">Review</button>
          </div>
        ))}
      </div>

      {/* 4. Budget Statistics & Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase">Total Budget</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-1">${metrics.totalBudget.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase">Budget Utilization</p>
          <div className="flex items-baseline gap-2 mt-1">
            <h3 className="text-3xl font-bold text-blue-600">{metrics.budgetUtilization}%</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase">Remaining Budget</p>
          <h3 className="text-3xl font-bold text-emerald-600 mt-1">${metrics.remainingBudget.toLocaleString()}</h3>
        </div>
      </div>

      {/* 5. Recent Expenses Table */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-md font-semibold text-gray-800 mb-4">Recent Expenses</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b text-gray-400 text-xs uppercase">
                <th className="pb-3 font-medium">Expense Title</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-gray-50">
                  <td className="py-3 font-medium text-gray-800">{exp.title}</td>
                  <td className="py-3 text-gray-500">
                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-semibold">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3 text-gray-500">{exp.date}</td>
                  <td className="py-3 text-right font-bold text-gray-800">${exp.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}