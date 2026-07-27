import React from 'react';

export default function PortfolioOverview({ portfolio }) {
  // Fallback / mock data for overview metrics
  const totalPortfolios = 3;
  const activeProjects = portfolio?.projectsCount || 8;
  const totalBudget = portfolio?.budget || 450000;
  const totalSpent = portfolio?.spent || 310000;
  const progressPercent = 75;

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
      {/* Title & Description Header */}
      <div>
        <h3 className="font-bold text-gray-800 text-xl mb-1">
          Portfolio Performance Overview
        </h3>
        <p className="text-sm text-gray-500">
          Aggregate progress indicators, cost control metrics, and schedule variance across active portfolios.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
            Active Scope
          </span>
          <p className="text-2xl font-extrabold text-gray-800 mt-1">
            {activeProjects} Projects
          </p>
          <span className="text-xs text-gray-400">Across {totalPortfolios} Portfolios</span>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
            Total Budget Spent
          </span>
          <p className="text-2xl font-extrabold text-gray-800 mt-1">
            ${totalSpent.toLocaleString()}
          </p>
          <span className="text-xs text-emerald-600 font-medium">
            of ${totalBudget.toLocaleString()} Total
          </span>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
            Overall Health
          </span>
          <div className="mt-1 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span className="text-lg font-bold text-gray-800">On Track (Green)</span>
          </div>
          <span className="text-xs text-gray-400">Low Risk Exposure</span>
        </div>
      </div>

      {/* Overall Completion Status Bar */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold text-gray-700">Aggregate Execution Progress</span>
          <span className="font-bold text-blue-600">{progressPercent}% Completed</span>
        </div>
        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}