import React from 'react';

export default function PortfolioRisks() {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-800 text-lg mb-3">Portfolio Risk Distribution</h3>
      <div className="grid grid-cols-3 gap-4 text-xs font-medium">
        <div className="bg-red-50 text-red-700 p-3 rounded border border-red-200">
          <p className="font-bold text-xl">2</p>
          <span>High Severity</span>
        </div>
        <div className="bg-yellow-50 text-yellow-700 p-3 rounded border border-yellow-200">
          <p className="font-bold text-xl">5</p>
          <span>Medium Severity</span>
        </div>
        <div className="bg-green-50 text-green-700 p-3 rounded border border-green-200">
          <p className="font-bold text-xl">14</p>
          <span>Low Severity</span>
        </div>
      </div>
    </div>
  );
}