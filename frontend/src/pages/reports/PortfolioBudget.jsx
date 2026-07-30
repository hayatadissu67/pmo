import React from 'react';

/**
 * PortfolioBudget Component
 * Displays budget breakdown, allocation vs actual spend, and financial health for the selected portfolio.
 */
export default function PortfolioBudget({ portfolioId, portfolio }) {
  // Fallback defaults if portfolio object isn't fully passed
  const budget = portfolio?.budget || 450000;
  const spent = portfolio?.spent || 310000;
  const allocated = Math.round(budget * 0.85); // e.g., 85% allocated
  const remaining = budget - spent;
  const percentageSpent = Math.min(Math.round((spent / budget) * 100), 100);

  // Financial status helper
  const getBudgetStatus = (spent, total) => {
    const ratio = spent / total;
    if (ratio > 0.9) return { label: 'Over Budget Warning', color: 'bg-red-100 text-red-700' };
    if (ratio > 0.75) return { label: 'Attention Needed', color: 'bg-amber-100 text-amber-700' };
    return { label: 'On Budget', color: 'bg-emerald-100 text-emerald-700' };
  };

  const status = getBudgetStatus(spent, budget);

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-100 pb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Budget Utilization</h3>
          <p className="text-xs text-gray-500">Financial tracking and allocation summary</p>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${status.color}`}>
          {status.label}
        </span>
      </div>

      {/* Main Numbers */}
      <div className="flex justify-between items-baseline pt-1">
        <div>
          <span className="text-xs text-gray-500 block">Total Spent</span>
          <span className="text-3xl font-extrabold text-gray-900">
            ${spent.toLocaleString()}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500 block">Total Approved Budget</span>
          <span className="text-lg font-bold text-gray-700">
            ${budget.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-600 font-medium">
          <span>Spent Progress</span>
          <span>{percentageSpent}% Used</span>
        </div>
        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
          <div
            className={`h-3 transition-all duration-300 rounded-full ${
              percentageSpent > 90
                ? 'bg-red-500'
                : percentageSpent > 75
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${percentageSpent}%` }}
          />
        </div>
      </div>

      {/* Detail Breakdown Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm pt-3 border-t border-gray-100">
        <div className="p-2.5 bg-gray-50 rounded-md">
          <span className="text-xs text-gray-500 block">Allocated Funds</span>
          <span className="font-semibold text-gray-800">${allocated.toLocaleString()}</span>
        </div>
        <div className="p-2.5 bg-gray-50 rounded-md">
          <span className="text-xs text-gray-500 block">Remaining Balance</span>
          <span className={`font-semibold ${remaining < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
            ${remaining.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}