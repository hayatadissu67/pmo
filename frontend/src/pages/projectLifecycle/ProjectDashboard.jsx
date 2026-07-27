import React from 'react';

export default function ProjectDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PMO Control Tower Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back! Here is your project overview and summary.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total Projects</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">12</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Active Change Requests</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">4</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">2</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total Budget</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">$128,400</h3>
        </div>
      </div>
    </div>
  );
}