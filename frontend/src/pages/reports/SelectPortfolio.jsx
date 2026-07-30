import React from 'react';

const mockPortfolios = [
  { id: 'port-1', title: 'Digital Transformation', projectCount: 8, department: 'IT Operations' },
  { id: 'port-2', title: 'Infrastructure & Cloud', projectCount: 4, department: 'DevOps' },
  { id: 'port-3', title: 'Customer Experience', projectCount: 6, department: 'Product' },
];

export default function SelectPortfolio({ selectedPortfolio, onSelectPortfolio }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-1">2. Select Portfolio</h3>
      <p className="text-xs text-gray-500 mb-4">Filter by organizational portfolio stream.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {mockPortfolios.map((item) => {
          const active = selectedPortfolio === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectPortfolio && onSelectPortfolio(item.id)}
              className={`p-4 text-left rounded-lg border transition ${
                active
                  ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-gray-500">{item.department}</p>
              <span className="inline-block mt-3 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                {item.projectCount} Projects
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}