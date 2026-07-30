import React, { useState } from 'react';

export default function ChangeRequests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingRequest, setViewingRequest] = useState(null);
  const [editingRequest, setEditingRequest] = useState(null);
  
  const [newTitle, setNewTitle] = useState('');
  const [newProject, setNewProject] = useState('PMO Control Tower');
  const [newCategory, setNewCategory] = useState('Infrastructure');
  const [newType, setNewType] = useState('Budget Increase');
  const [newAmount, setNewAmount] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');

  const [requests, setRequests] = useState([
    {
      id: 101,
      title: "Infrastructure Scale-up",
      project: "PMO Control Tower",
      category: "Infrastructure",
      date: "2026-07-27",
      requestType: "Budget Increase",
      requestedAmount: 7500,
      priority: "High",
      status: "Pending"
    },
    {
      id: 102,
      title: "Design Software License",
      project: "Creative Hub",
      category: "Design",
      date: "2026-07-25",
      requestType: "Reallocation",
      requestedAmount: 1500,
      priority: "Medium",
      status: "Approved"
    },
    {
      id: 103,
      title: "Security Audit & Penetration Testing",
      project: "FinTech Gateway",
      category: "Security",
      date: "2026-07-22",
      requestType: "Compliance",
      requestedAmount: 8500,
      priority: "Critical",
      status: "Pending"
    },
    {
      id: 104,
      title: "API Rate Limiting Implementation",
      project: "Logistics Core",
      category: "Backend",
      date: "2026-07-20",
      requestType: "Performance",
      requestedAmount: 1800,
      priority: "Low",
      status: "Rejected"
    }
  ]);

  const filteredRequests = requests.filter(req => {
    const query = searchTerm.toLowerCase();
    return (
      (req.title && req.title.toLowerCase().includes(query)) ||
      (req.project && req.project.toLowerCase().includes(query)) ||
      (req.category && req.category.toLowerCase().includes(query))
    );
  });

  const onView = (req) => {
    setViewingRequest(req);
  };

  const onEdit = (req) => {
    setEditingRequest(req);
  };

  const onDelete = (id) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle || !newAmount) {
      alert("Please fill in all required fields.");
      return;
    }

    const newItem = {
      id: Date.now().toString().slice(-3),
      title: newTitle,
      project: newProject,
      category: newCategory,
      date: new Date().toISOString().split('T')[0],
      requestType: newType,
      requestedAmount: Number(newAmount),
      priority: newPriority,
      status: "Pending"
    };

    setRequests([newItem, ...requests]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewAmount('');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setRequests(requests.map(req => req.id === editingRequest.id ? editingRequest : req));
    setEditingRequest(null);
  };

  return (
    <div className="p-6 space-y-6 relative">
      {/* PMO Dashboard Header & New Request Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PMO Change Requests</h1>
          <p className="text-sm text-gray-500 mt-1">Search, manage, approve, or delete budget change requests.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <span>+ New Change Request</span>
        </button>
      </div>

      {/* Search Box */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <input 
          type="text"
          placeholder="Search by title, project, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm"
        />
      </div>

      {/* Request History Card & Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Request History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b bg-gray-50">
                <th className="py-3.5 px-4">ID</th>
                <th className="py-3.5 px-4">Title</th>
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50 text-sm transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-900">#{req.id}</td>
                    <td className="py-4 px-4 font-semibold text-gray-800">{req.title}</td>
                    <td className="py-4 px-4 text-gray-600">{req.project}</td>
                    <td className="py-4 px-4 text-gray-600">{req.category || 'N/A'}</td>
                    <td className="py-4 px-4 text-gray-600">{req.date}</td>
                    <td className="py-4 px-4 text-gray-600">{req.requestType}</td>
                    <td className="py-4 px-4 font-bold text-gray-900">${Number(req.requestedAmount).toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        req.priority === 'High' ? 'bg-red-100 text-red-700' :
                        req.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                        req.priority === 'Critical' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {req.priority}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        req.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button onClick={() => onView(req)} className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer">View</button>
                      <button onClick={() => onEdit(req)} className="text-amber-600 hover:text-amber-800 font-medium cursor-pointer">Edit</button>
                      <button onClick={() => onDelete(req.id)} className="text-red-600 hover:text-red-800 font-medium cursor-pointer">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="py-8 text-center text-gray-500 text-sm">
                    No change requests found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form for New Change Request */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-gray-900">Create New Change Request</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer">&times;</button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Cloud Infrastructure Upgrade"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Project</label>
                  <select 
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="PMO Control Tower">PMO Control Tower</option>
                    <option value="Creative Hub">Creative Hub</option>
                    <option value="FinTech Gateway">FinTech Gateway</option>
                    <option value="Logistics Core">Logistics Core</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Category</label>
                  <select 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Design">Design</option>
                    <option value="Security">Security</option>
                    <option value="Backend">Backend</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Amount ($)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 5000"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Priority</label>
                  <select 
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-xl text-sm text-gray-600 hover:bg-gray-50 font-medium cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium shadow-sm cursor-pointer">Save Request</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Viewing Request Details */}
      {viewingRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-gray-900">Change Request Details</h3>
              <button onClick={() => setViewingRequest(null)} className="text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer">&times;</button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase">ID</span>
                <p className="font-medium text-gray-900">#{viewingRequest.id}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase">Title</span>
                <p className="font-semibold text-gray-800">{viewingRequest.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase">Project</span>
                  <p className="text-gray-700">{viewingRequest.project}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase">Category</span>
                  <p className="text-gray-700">{viewingRequest.category || 'N/A'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase">Date</span>
                  <p className="text-gray-700">{viewingRequest.date}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase">Type</span>
                  <p className="text-gray-700">{viewingRequest.requestType}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase">Amount</span>
                  <p className="font-bold text-gray-900">${Number(viewingRequest.requestedAmount).toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase">Priority</span>
                  <p className="text-gray-700">{viewingRequest.priority}</p>
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase">Status</span>
                <p className="text-gray-700">{viewingRequest.status}</p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button onClick={() => setViewingRequest(null)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Editing Request */}
      {editingRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-gray-900">Edit Change Request</h3>
              <button onClick={() => setEditingRequest(null)} className="text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer">&times;</button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Title</label>
                <input 
                  type="text" 
                  required
                  value={editingRequest.title}
                  onChange={(e) => setEditingRequest({...editingRequest, title: e.target.value})}
                  className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Project</label>
                  <input 
                    type="text"
                    value={editingRequest.project}
                    onChange={(e) => setEditingRequest({...editingRequest, project: e.target.value})}
                    className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Category</label>
                  <input 
                    type="text"
                    value={editingRequest.category}
                    onChange={(e) => setEditingRequest({...editingRequest, category: e.target.value})}
                    className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Amount ($)</label>
                  <input 
                    type="number" 
                    required
                    value={editingRequest.requestedAmount}
                    onChange={(e) => setEditingRequest({...editingRequest, requestedAmount: e.target.value})}
                    className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Priority</label>
                  <select 
                    value={editingRequest.priority}
                    onChange={(e) => setEditingRequest({...editingRequest, priority: e.target.value})}
                    className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setEditingRequest(null)} className="px-4 py-2 border rounded-xl text-sm text-gray-600 hover:bg-gray-50 font-medium cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium shadow-sm cursor-pointer">Update Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}