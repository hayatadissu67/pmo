import React from 'react';

/**
 * PortfolioList Component
 * Renders a selector toolbar for choosing the active portfolio scope.
 */
export default function PortfolioList({ 
  portfolios = [], 
  selected = '', 
  onSelect = () => {} 
}) {
  return (
    <div className="flex items-center gap-3 bg-white p-2.5 border border-gray-200 rounded-lg shadow-sm">
      <label htmlFor="portfolio-select" className="text-sm font-semibold text-gray-700 whitespace-nowrap pl-2">
        Active Portfolio:
      </label>
      <select
        id="portfolio-select"
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 font-medium"
      >
        {portfolios?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name} ({item.projectsCount || 0} Projects)
          </option>
        ))}
      </select>
    </div>
  );
}