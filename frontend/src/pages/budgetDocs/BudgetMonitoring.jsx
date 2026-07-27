import React, { useState } from 'react';

export default function BudgetMonitoring() {
  const [metrics] = useState({
    totalBudget: 150000,
    totalSpent: 117750,
  });

  const remainingBudget = metrics.totalBudget - metrics.totalSpent;
  const utilizationRate = ((metrics.totalSpent / metrics.totalBudget) * 100).toFixed(1);

  const [alerts] = useState([
    { id: 1, category: 'Cloud Infrastructure', message: 'Utilization has exceeded 85% of allocated limit.', severity: 'Warning' },
    { id: 2, category: 'Marketing & Ads', message: 'Approaching monthly spending threshold.', severity: 'Info' },
  ]);

  const [trends] = useState([
    { id: 1, month: 'May', spent: 34000, status: 'Stable' },
    { id: 2, month: 'June', spent: 41000, status: 'High' },
    { id: 3, month: 'July', spent: 42750, status: 'Critical' },
  ]);

  const [forecasts] = useState([
    { id: 1, period: 'Q3 Forecast', projectedSpend: 135000, variance: '+$10,000' },
    { id: 2, period: 'Q4 Forecast', projectedSpend: 120000, variance: '-$5,000' },
  ]);

  return (
    <div className="space-y-6">
      {/* 1. Remaining Budget & Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <span className="text-xs text-gray-400 font-medium uppercase">Remaining Budget</span>
          <h4 className={`text-2xl font-bold mt-1 ${remainingBudget >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            ${remainingBudget.toLocaleString()}
          </h4>
          <p className="text-xs text-gray-500 mt-2">Overall utilization rate is at {utilizationRate}%</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <span className="text-xs text-gray-400 font-medium uppercase">Monthly Summary</span>
          <h4 className="text-2xl font-bold text-gray-900 mt-1">${metrics.totalSpent.toLocaleString()} Spent</h4>
          <p className="text-xs text-gray-500 mt-2">Tracked across all active departments and projects.</p>
        </div>
      </div>

      {/* 2. Overspending Alerts */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Overspending Alerts</h3>
        <div className="space-y-3">
          {alerts.map(alert => (
            <div key={alert.id} className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl flex items-start justify-between">
              <div>
                <span className="font-semibold text-gray-900 text-sm">{alert.category}</span>
                <p className="text-xs text-gray-600 mt-0.5">{alert.message}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                {alert.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Spending Trends */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Spending Trends</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {trends.map(t => (
            <div key={t.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-xs font-medium text-gray-400">{t.month}</span>
              <h4 className="text-xl font-bold text-gray-900 mt-1">${t.spent.toLocaleString()}</h4>
              <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${
                t.status === 'Critical' ? 'bg-red-50 text-red-600' : t.status === 'High' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
              }`}>
                {t.status} Trend
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Budget Forecast */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Budget Forecast</h3>
          <p className="text-xs text-gray-500 mt-0.5">Projected spending estimates and anticipated variances.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b text-gray-400 bg-gray-50">
                <th className="py-3 px-4 font-medium">Period</th>
                <th className="py-3 px-4 font-medium">Projected Spend</th>
                <th className="py-3 px-4 font-medium text-right">Variance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {forecasts.map(f => (
                <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-800">{f.period}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">${f.projectedSpend.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-bold text-blue-600">{f.variance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}