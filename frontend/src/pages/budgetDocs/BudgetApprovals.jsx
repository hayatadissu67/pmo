import React, { useState } from 'react';

export default function BudgetApprovals() {
  const [approvals, setApprovals] = useState([
    { id: 1, title: 'Cloud Infrastructure Upgrade', department: 'Infrastructure', amount: 15000, status: 'Pending', comments: '' },
    { id: 2, title: 'Marketing Campaign Q3', department: 'Marketing', amount: 8500, status: 'Pending', comments: '' },
  ]);

  const [history, setHistory] = useState([
    { id: 1, title: 'Q2 Office Supplies', amount: '$3,200', status: 'Approved', date: '2026-07-10', comments: 'Looks good.' },
  ]);

  const [selectedId, setSelectedId] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const handleApprove = (id) => {
    const item = approvals.find(a => a.id === Number(id));
    if (!item) return;

    setApprovals(approvals.filter(a => a.id !== Number(id)));
    setHistory([{
      id: Date.now(),
      title: item.title,
      amount: `$${item.amount.toLocaleString()}`,
      status: 'Approved',
      date: new Date().toISOString().split('T')[0],
      comments: reviewComment || 'Approved by manager'
    }, ...history]);

    setSelectedId('');
    setReviewComment('');
  };

  const handleReject = (id) => {
    const item = approvals.find(a => a.id === Number(id));
    if (!item) return;

    setApprovals(approvals.filter(a => a.id !== Number(id)));
    setHistory([{
      id: Date.now(),
      title: item.title,
      amount: `$${item.amount.toLocaleString()}`,
      status: 'Rejected',
      date: new Date().toISOString().split('T')[0],
      comments: reviewComment || 'Rejected'
    }, ...history]);

    setSelectedId('');
    setReviewComment('');
  };

  return (
    <div className="space-y-6">
      {/* 1. Pending Approvals */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pending Approvals</h3>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b text-gray-400">
              <th className="pb-3 font-medium">Request Title</th>
              <th className="pb-3 font-medium">Department</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {approvals.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-400">No pending approvals found.</td>
              </tr>
            ) : (
              approvals.map(a => (
                <tr key={a.id}>
                  <td className="py-3 font-medium text-gray-800">{a.title}</td>
                  <td className="py-3 text-gray-500">{a.department}</td>
                  <td className="py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600">
                      {a.status}
                    </span>
                  </td>
                  <td className="py-3 text-right font-bold">${a.amount.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 2. Review Request & Actions (Approve / Reject / Comments) */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Review Request</h3>
        <p className="text-sm text-gray-500 mb-4">Select a pending request to approve, reject, and add review comments.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <select 
            value={selectedId} 
            onChange={(e) => setSelectedId(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          >
            <option value="">Select Request to Review</option>
            {approvals.map(a => (
              <option key={a.id} value={a.id}>{a.title} (${a.amount.toLocaleString()})</option>
            ))}
          </select>

          <input 
            type="text" 
            placeholder="Add comments / reasons..."
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            className="sm:col-span-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button 
            onClick={() => handleReject(selectedId)}
            className="py-2.5 px-5 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors cursor-pointer"
          >
            Reject Budget
          </button>
          <button 
            onClick={() => handleApprove(selectedId)}
            className="py-2.5 px-5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            Approve Budget
          </button>
        </div>
      </div>

      {/* 3. Approval History */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Approval History</h3>
          <p className="text-xs text-gray-500 mt-0.5">Log of past decisions and review notes.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b text-gray-400 bg-gray-50">
                <th className="py-3 px-4 font-medium">Request Title</th>
                <th className="py-3 px-4 font-medium">Amount</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Comments</th>
                <th className="py-3 px-4 font-medium text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.map(h => (
                <tr key={h.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-800">{h.title}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{h.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      h.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {h.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 text-xs">{h.comments}</td>
                  <td className="py-3 px-4 text-right text-gray-400 text-xs">{h.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}