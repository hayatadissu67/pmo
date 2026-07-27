import React, { useState } from 'react';
import Overview from './Overview';
import BudgetPlanning from './BudgetPlanning';
import BudgetAllocation from './BudgetAllocation';
import ExpenseTracking from './ExpenseTracking';
import BudgetApprovals from './BudgetApprovals';
import BudgetMonitoring from './BudgetMonitoring';

export default function BudgetPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Navigation Header & Tabs */}
      <div className="bg-white p-4 rounded-xl shadow border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-xl font-bold text-gray-800">Budget & Governance Module</h1>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('planning')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'planning' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Planning
          </button>
          <button
            onClick={() => setActiveTab('allocation')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'allocation' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Allocation
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'expenses' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Expenses
          </button>
          <button
            onClick={() => setActiveTab('approvals')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'approvals' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Approvals
          </button>
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'monitoring' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Monitoring
          </button>
        </div>
      </div>

      {/* Active Tab Content Rendering */}
      <div className="mt-4">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'planning' && <BudgetPlanning />}
        {activeTab === 'allocation' && <BudgetAllocation />}
        {activeTab === 'expenses' && <ExpenseTracking />}
        {activeTab === 'approvals' && <BudgetApprovals />}
        {activeTab === 'monitoring' && <BudgetMonitoring />}
      </div>
    </div>
  );
}