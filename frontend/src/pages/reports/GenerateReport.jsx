import React from 'react';

export default function GenerateReport({ genData }) {
  const handleGenerate = () => {
    alert(`Report generation triggered!\nProject: ${genData.projectId || 'N/A'}\nPortfolio: ${genData.portfolioId || 'N/A'}`);
  };

  return (
    <div>
      <button 
        onClick={handleGenerate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md text-sm transition-colors shadow-sm"
      >
        Compile & Generate Report
      </button>
    </div>
  );
}