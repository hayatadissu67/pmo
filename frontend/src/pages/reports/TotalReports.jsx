import React from 'react';

export default function TotalReports() {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-blue-600">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">Total Reports Filed</p>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">148</h2>
        </div>
        <span className="p-1.5 bg-blue-50 text-blue-600 rounded text-xs font-bold">+12% MoM</span>
      </div>
      <p className="text-xs text-gray-500 mt-3">Active & historical records combined</p>
    </div>
  );
}