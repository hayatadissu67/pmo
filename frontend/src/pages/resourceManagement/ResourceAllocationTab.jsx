import React, { useState } from 'react';

export default function ResourceAllocationTab({ employees, assignments, onAddAssignment, onRemoveAssignment, onReallocateAssignment }) {
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [allocationForm, setAllocationForm] = useState({
    project: '',
    task: '',
    allocatedHours: 10
  });

  // Filter employees based on search query
  const filteredEmployees = employees.filter(
    (e) =>
      e.isActive &&
      (e.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
       e.role.toLowerCase().includes(employeeSearch.toLowerCase()))
  );

  const handleSelectEmployee = (emp) => {
    setSelectedEmp(emp);
    setEmployeeSearch(`${emp.name} - ${emp.role} (${emp.status})`);
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedEmp || !allocationForm.project) return;

    if (editingId) {
      // Handle Reallocate
      onReallocateAssignment(editingId, {
        employeeId: selectedEmp.id,
        project: allocationForm.project,
        task: allocationForm.task,
        allocatedHours: parseInt(allocationForm.allocatedHours) || 0
      });
      setEditingId(null);
    } else {
      // Handle New Allocation
      onAddAssignment({
        employeeId: selectedEmp.id,
        project: allocationForm.project,
        task: allocationForm.task,
        allocatedHours: parseInt(allocationForm.allocatedHours) || 0
      });
    }

    // Reset Form
    setSelectedEmp(null);
    setEmployeeSearch('');
    setAllocationForm({ project: '', task: '', allocatedHours: 10 });
  };

  const handleStartReallocate = (item) => {
    const emp = employees.find((e) => e.id === item.employeeId);
    setEditingId(item.id);
    setSelectedEmp(emp || { id: item.employeeId, name: item.employeeName });
    setEmployeeSearch(item.employeeName);
    setAllocationForm({
      project: item.project,
      task: item.task,
      allocatedHours: item.allocatedHours
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setSelectedEmp(null);
    setEmployeeSearch('');
    setAllocationForm({ project: '', task: '', allocatedHours: 10 });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
      
      {/* Allocation / Reallocation Form */}
      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', height: 'fit-content' }}>
        <h3 style={{ marginTop: 0, fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {editingId ? '🔄 Reallocate Resource' : '➕ Project Allocation'}
        </h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Searchable Employee Field */}
          <div style={{ position: 'relative' }}>
            <label style={{ fontSize: '13px', fontWeight: '600' }}>Type / Select Employee *</label>
            <input
              type="text"
              placeholder="Start typing employee name or role..."
              value={employeeSearch}
              onChange={(e) => {
                setEmployeeSearch(e.target.value);
                setSelectedEmp(null);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '4px', boxSizing: 'border-box' }}
            />

            {/* Dropdown Options List */}
            {showDropdown && filteredEmployees.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: '#fff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  maxHeight: '180px',
                  overflowY: 'auto',
                  zIndex: 10,
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                }}
              >
                {filteredEmployees.map((emp) => (
                  <div
                    key={emp.id}
                    onClick={() => handleSelectEmployee(emp)}
                    style={{
                      padding: '10px 12px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #f1f5f9',
                      fontSize: '13px'
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <div style={{ fontWeight: '600', color: '#0f172a' }}>{emp.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{emp.role} • <span style={{ color: '#2563eb' }}>{emp.status}</span></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Project Name */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600' }}>Project Name *</label>
            <input
              type="text"
              placeholder="e.g. Mobile App Redesign"
              value={allocationForm.project}
              onChange={(e) => setAllocationForm({ ...allocationForm, project: e.target.value })}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '4px', boxSizing: 'border-box' }}
            />
          </div>

          {/* Task Description */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600' }}>Task Description</label>
            <input
              type="text"
              placeholder="e.g. Backend API Setup"
              value={allocationForm.task}
              onChange={(e) => setAllocationForm({ ...allocationForm, task: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '4px', boxSizing: 'border-box' }}
            />
          </div>

          {/* Allocated Hours */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600' }}>Allocated Hours / Week</label>
            <input
              type="number"
              min="1"
              max="40"
              value={allocationForm.allocatedHours}
              onChange={(e) => setAllocationForm({ ...allocationForm, allocatedHours: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '4px', boxSizing: 'border-box' }}
            />
          </div>

          {/* Form Action Buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '12px',
                background: editingId ? '#d97706' : '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {editingId ? 'Save Reallocation' : 'Confirm Allocation'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                style={{
                  padding: '12px 16px',
                  background: '#f1f5f9',
                  color: '#475569',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Allocation Directory & Actions */}
      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ marginTop: 0, fontSize: '18px', marginBottom: '16px' }}>📜 Active Allocations</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px' }}>Employee</th>
              <th style={{ padding: '10px' }}>Project & Task</th>
              <th style={{ padding: '10px' }}>Allocation</th>
              <th style={{ padding: '10px' }}>Date</th>
              <th style={{ padding: '10px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px', fontWeight: '600' }}>{item.employeeName}</td>
                <td style={{ padding: '10px' }}>
                  <div><b>{item.project}</b></div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{item.task}</div>
                </td>
                <td style={{ padding: '10px', color: '#2563eb', fontWeight: '600' }}>{item.allocatedHours} hrs/wk</td>
                <td style={{ padding: '10px', fontSize: '12px', color: '#64748b' }}>{item.assignedDate}</td>
                <td style={{ padding: '10px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => handleStartReallocate(item)}
                      style={{ padding: '4px 8px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Reallocate
                    </button>
                    <button
                      onClick={() => onRemoveAssignment(item.id)}
                      style={{ padding: '4px 8px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}