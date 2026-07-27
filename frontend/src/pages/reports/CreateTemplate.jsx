import React from 'react';

export default function CreateTemplate() {
  return (
    <button 
      onClick={() => alert('New Template Builder initialized')}
      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-4 rounded shadow-sm transition-colors"
    >
      + Create Template
    </button>
  );
}