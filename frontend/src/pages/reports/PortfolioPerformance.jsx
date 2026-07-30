import React from 'react';

/**
 * PortfolioPerformance Component
 * Displays executive KPIs and PMO project health indicators for the selected portfolio.
 */
export default function PortfolioPerformance({ portfolioId, portfolio }) {
  // Sample calculated performance metrics
  const performanceData = {
    health: 'Green', // 'Green' | 'Yellow' | 'Red'
    totalProjects: portfolio?.projectsCount || 8,
    activeProjects: 6,
    completedProjects: 2,
    delayedProjects: 0,
    openRisks: 2,
    pendingApprovals: 3,
    scheduleVariance: '+4 Days Ahead',
  };

  // Health indicator styling helper
  const getHealthBadge = (health) => {
    switch (health) {
      case 'Green':
        return {
          label: '🟢 Green (On Track)',
          style: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        };
      case 'Yellow':
        return {
          label: '🟡 Yellow (Attention Required)',
          style: 'bg-amber-50 text-amber-700 border-amber-200',
        };
      case 'Red':
        return {
          label: '🔴 Red (Critical)',
          style: 'bg-red-50 text-red-700 border-red-200',
        };
      default:
        return {
          label: '🟢 Green (On Track)',
          style: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        };
    }
  };

  const healthBadge = getHealthBadge(performanceData.health);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* KPI Card 1: Portfolio Health Status */}
      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Portfolio Health
        </span>
        <div className="mt-2">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${healthBadge.style}`}
          >
            {healthBadge.label}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-2">Based on schedule & risk thresholds</p>
      </div>

      {/* KPI Card 2: Active & Total Projects */}
      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Project Breakdown
        </span>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-gray-900">
            {performanceData.activeProjects}
          </span>
          <span className="text-xs text-gray-500 font-medium">
            / {performanceData.totalProjects} Active
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          <span className="text-emerald-600 font-medium">{performanceData.completedProjects} Completed</span>
          {' • '}
          <span className="text-gray-400">{performanceData.delayedProjects} Delayed</span>
        </p>
      </div>

      {/* KPI Card 3: Schedule Variance */}
      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Schedule Variance
        </span>
        <div className="mt-1">
          <span className="text-2xl font-extrabold text-emerald-600">
            {performanceData.scheduleVariance}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Baseline vs actual timeline performance</p>
      </div>

      {/* KPI Card 4: Action Items & Governance */}
      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Governance & Risks
        </span>
        <div className="mt-1 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-amber-600">{performanceData.openRisks}</span>
            <span className="text-xs text-gray-500 block">Open Risks</span>
          </div>
          <div className="border-l border-gray-200 pl-4">
            <span className="text-xl font-bold text-blue-600">
              {performanceData.pendingApprovals}
            </span>
            <span className="text-xs text-gray-500 block">Pending Docs</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-1">Requires PMO Review</p>
      </div>
    </div>
  );
}