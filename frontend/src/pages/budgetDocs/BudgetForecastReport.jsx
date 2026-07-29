import React, { useState } from 'react';

export default function BudgetForecastReport() {
  const [forecastData] = useState([
    { id: 1, department: 'Cloud & Infrastructure', currentAllocation: 45000, projectedExpense: 48000, variance: '+$3,000' },
    { id: 2, department: 'Design & Software', currentAllocation: 30000, projectedExpense: 27500, variance: '-$2,500' },
    { id: 3, department: 'Human Resources', currentAllocation: 35000, projectedExpense: 35000, variance: '$0' },
  ]);

  return (
    <div className="space-y-6">
      {/* Forecast Report Header */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Budget Forecast & Financial Report</h3>
        <p className="text-sm text-gray-500">Comprehensive forecast summary analyzing department variances and upcoming expenditure projections.</p>
      </div>

      {/* Forecast Table */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Department Variance Analysis</h3>
          <p className="text-xs text-gray-500 mt-0.5">Comparison between active allocations and forecasted expenses.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b text-gray-400 bg-gray-50">
                <th className="py-3 px-4 font-medium">Department</th>
                <th className="py-3 px-4 font-medium">Current Allocation</th>
                <th className="py-3 px-4 font-medium">Projected Expense</th>
                <th className="py-3 px-4 font-medium text-right">Variance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {forecastData.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-800">{item.department}</td>
                  <td className="py-3 px-4 text-gray-600">${item.currentAllocation.toLocaleString()}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">${item.projectedExpense.toLocaleString()}</td>
                  <td className={`py-3 px-4 text-right font-bold ${item.variance.startsWith('+') ? 'text-red-600' : 'text-emerald-600'}`}>
                    {item.variance}
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