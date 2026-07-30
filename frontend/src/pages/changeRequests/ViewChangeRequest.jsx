import React from 'react';
import ApprovalWorkflow from './ApprovalWorkflow';

export default function ViewChangeRequest({ request, onClose, onStatusChange }) {
  if (!request) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold text-gray-800 mb-1">Change Request Details</h3>
        <p className="text-xs text-gray-400 mb-4">Request ID: {request.id}</p>
        
        <div className="space-y-3 text-sm">
          <div><strong className="text-gray-500">Title:</strong> <span className="text-gray-800">{request.title}</span></div>
          <div><strong className="text-gray-500">Project:</strong> <span className="text-gray-800">{request.projectName}</span></div>
          <div><strong className="text-gray-500">Category:</strong> <span className="text-gray-800">{request.category}</span></div>
          <div><strong className="text-gray-500">Type:</strong> <span className="text-gray-800">{request.requestType}</span></div>
          <div><strong className="text-gray-500">Amount:</strong> <span className="font-bold text-blue-600">${request.requestedAmount.toLocaleString()}</span></div>
          <div><strong className="text-gray-500">Date:</strong> <span className="text-gray-800">{request.date}</span></div>
          <div><strong className="text-gray-500">Description:</strong> <p className="text-gray-600 bg-gray-50 p-2 rounded mt-1">{request.description}</p></div>
        </div>

        <ApprovalWorkflow request={request} onStatusChange={onStatusChange} />

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}