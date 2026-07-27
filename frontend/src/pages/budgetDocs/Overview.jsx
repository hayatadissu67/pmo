import React from 'react';

export default function Overview() {
  return (
    <div className="space-y-6">
      {/* 1. Budget Overview */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Budget Overview</h3>
        <p className="text-sm text-gray-500">High-level summary of financial health, allocations, and key updates.</p>
      </div>

      {/* 2. Budget Statistics & Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-xs text-gray-400 font-medium uppercase">Total Budget</span>
          <h4 className="text-2xl font-bold text-gray-900 mt-1">$150,000</h4>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-xs text-gray-400 font-medium uppercase">Total Expense</span>
          <h4 className="text-2xl font-bold text-red-600 mt-1">$117,750</h4>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-xs text-gray-400 font-medium uppercase">Remaining Budget</span>
          <h4 className="text-2xl font-bold text-emerald-600 mt-1">$32,250</h4>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-xs text-gray-400 font-medium uppercase">Budget Utilization</span>
          <h4 className="text-2xl font-bold text-blue-600 mt-1">78.5%</h4>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-xs text-gray-400 font-medium uppercase">Budget Status</span>
          <h4 className="text-2xl font-bold text-amber-600 mt-1">Active / Warning</h4>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-xs text-gray-400 font-medium uppercase">Budget Alerts</span>
          <h4 className="text-2xl font-bold text-purple-600 mt-1">2 Active</h4>
        </div>
      </div>

      {/* 3. Recent Expenses & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-md font-bold text-gray-800 mb-4">Recent Expenses</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl text-sm">
              <span className="font-medium text-gray-700">Cloud Infrastructure (AWS)</span>
              <span className="font-semibold text-gray-900">$1,200</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl text-sm">
              <span className="font-medium text-gray-700">UI/UX Software Licensing</span>
              <span className="font-semibold text-gray-900">$450</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-md font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
              + New Budget Plan
            </button>
            <button className="w-full py-2.5 px-4 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
              Record Expense
            </button>
            <button className="w-full py-2.5 px-4 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}