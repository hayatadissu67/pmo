import React from 'react';

export default function DeleteTemplateModal({ template, onClose }) {
  const handleDelete = () => {
    alert(`Deleted template: ${template?.name || 'Selected Item'}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4 text-xs">
        <h3 className="text-base font-bold text-red-600">⚠️ Delete Template</h3>
        <p className="text-gray-600">
          Are you sure you want to delete <strong className="text-gray-800">{template?.name || 'this template'}</strong>?
        </p>

        <div className="flex justify-end gap-2 pt-3 border-t">
          <button onClick={onClose} className="px-3 py-1.5 border rounded-md text-gray-600 font-semibold">Cancel</button>
          <button onClick={handleDelete} className="px-3 py-1.5 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  );
}