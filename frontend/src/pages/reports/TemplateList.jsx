import React from 'react';

export default function TemplateList({ onSelectTemplate, selectedId }) {
  const templates = [
    { id: 'T1', name: 'Weekly Status Report', category: 'Status', fields: 10 },
    { id: 'T2', name: 'Project Closure Charter', category: 'Closure', fields: 14 },
    { id: 'T3', name: 'Executive Risk Matrix', category: 'Governance', fields: 8 }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
          <tr>
            <th className="p-3">Template Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Fields</th>
            <th className="p-3 text-right">Select</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {templates.map((t) => (
            <tr key={t.id} className={`hover:bg-gray-50 ${selectedId === t.id ? 'bg-blue-50/50' : ''}`}>
              <td className="p-3 font-medium text-gray-800">{t.name}</td>
              <td className="p-3 text-gray-600">{t.category}</td>
              <td className="p-3 text-gray-600">{t.fields} fields</td>
              <td className="p-3 text-right">
                <button
                  onClick={() => onSelectTemplate(t)}
                  className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded font-medium hover:bg-blue-700 transition-colors"
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}