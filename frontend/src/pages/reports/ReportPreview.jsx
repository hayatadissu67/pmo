import React from 'react';

export default function ReportPreview({ genData }) {
  return (
    <div className="p-5 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 space-y-2">
      <h4 className="font-bold text-gray-800">Live Config Preview</h4>
      <p className="text-xs">Adjust target parameters above to update report scope.</p>
      {genData.projectId && <p className="text-xs text-blue-600 font-semibold">Project Selected: {genData.projectId}</p>}
      {genData.portfolioId && <p className="text-xs text-purple-600 font-semibold">Portfolio Selected: {genData.portfolioId}</p>}
    </div>
  );
}