import React, { useState } from 'react';
import Overview from './Overview';
import BudgetPlanning from './BudgetPlanning';
import BudgetAllocation from './BudgetAllocation';
import ExpenseTracking from './ExpenseTracking';
import BudgetApprovals from './BudgetApprovals';
import BudgetMonitoring from './BudgetMonitoring';
import BudgetForecastReport from './BudgetForecastReport';
export default function BudgetPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6 space-y-6">
      {/* Navigation Header */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-gray-900">Budget & Governance Module</h2>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('planning')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'planning' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Planning
          </button>
          <button 
            onClick={() => setActiveTab('allocation')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'allocation' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Allocation
          </button>
          <button 
            onClick={() => setActiveTab('expenses')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'expenses' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Expenses
          </button>
          <button 
            onClick={() => setActiveTab('approvals')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'approvals' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Approvals
          </button>
          <button 
            onClick={() => setActiveTab('monitoring')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'monitoring' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Monitoring
          </button>
          <button 
            onClick={() => setActiveTab('forecast')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'forecast' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Forecast
          </button>
        </div>
      </div>

      {/* Render Components based on activeTab */}
      <div>
        {activeTab === 'overview' && <Overview setActiveTab={setActiveTab} />}
        {activeTab === 'planning' && <BudgetPlanning />}
        {activeTab === 'allocation' && <BudgetAllocation />}
        {activeTab === 'expenses' && <ExpenseTracking />}
        {activeTab === 'approvals' && <BudgetApprovals />}
        {activeTab === 'monitoring' && <BudgetMonitoring />}
        {activeTab === 'forecast' && <BudgetForecastReport />}
      </div>
    </div>
  );
}
import React from "react";

export default function BudgetDocs() {
  return (
    <div>BudgetPage</div>
  );
}
