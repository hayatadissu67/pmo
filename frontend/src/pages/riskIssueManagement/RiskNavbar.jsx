import React from 'react';
import { NavLink } from 'react-router-dom';

export default function RiskNavbar() {
  const navItems = [
    { label: 'Risk Overview', path: '/risks' },
    { label: 'Risk List', path: '/riskissuemanagenet/RiskList' },
    { label: 'Risk Matrix', path: '/riskissuemanagenet/RiskMatrix' },
    { label: 'Risk Assessment', path: '/riskissuemanagenet/RiskAssessment' },
    { label: 'Risk Report', path: '/riskissuemanagenet/RiskReport' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-3 mb-6">
      <div className="flex items-center space-x-4 text-xs font-bold">
        <span className="text-slate-400 uppercase tracking-wider mr-2">Risk Hub:</span>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}