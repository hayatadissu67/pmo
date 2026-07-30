import React from 'react';

const mockTemplates = [
  { id: 'tmpl-exec', name: 'Executive Summary', description: 'High-level KPI metrics, budget summaries, and milestone statuses.' },
  { id: 'tmpl-audit', name: 'Compliance & Audit Log', description: 'Detailed itemized logs, approval flows, and user changes.' },
  { id: 'tmpl-tech', name: 'Technical Progress Report', description: 'Development velocity, module completions, and open issues.' },
];

export default function SelectTemplate({ selectedTemplate, onSelectTemplate }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-1">3. Select Template</h3>
      <p className="text-xs text-gray-500 mb-4">Choose the layout structure for the final output document.</p>

      <div className="space-y-3">
        {mockTemplates.map((tmpl) => {
          const isSelected = selectedTemplate === tmpl.id;
          return (
            <label
              key={tmpl.id}
              className={`flex items-start p-3 border rounded-lg cursor-pointer transition ${
                isSelected ? 'border-blue-600 bg-blue-50/40' : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="reportTemplate"
                checked={isSelected}
                onChange={() => onSelectTemplate && onSelectTemplate(tmpl.id)}
                className="mt-1 text-blue-600 focus:ring-blue-500"
              />
              <div className="ml-3">
                <span className="block text-sm font-semibold text-gray-800">{tmpl.name}</span>
                <span className="block text-xs text-gray-500 mt-0.5">{tmpl.description}</span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}