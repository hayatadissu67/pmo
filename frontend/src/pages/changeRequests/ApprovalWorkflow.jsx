import React from 'react';

export default function ApprovalWorkflow({ request, onStatusChange }) {
  if (!request) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-4">
      <h4 className="text-xs font-bold uppercase text-gray-500 mb-3">Approval Workflow</h4>
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-gray-500">Current Status: </span>
          <span className={`font-semibold ${
            request.status === 'Approved' ? 'text-green-600' :
            request.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'
          }`}>
            {request.status}
          </span>
        </div>

        {request.status === 'Pending' && (
          <div className="flex gap-2">
            <button
              onClick={() => onStatusChange(request.id, 'Approved')}
              className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition"
            >
              Approve
            </button>
            <button
              onClick={() => onStatusChange(request.id, 'Rejected')}
              className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}