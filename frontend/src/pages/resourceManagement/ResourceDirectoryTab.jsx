import React, { useState } from 'react';

export default function ResourceDirectoryTab({ employees, onToggleStatus }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available':
        return <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 8px', borderRadius: '6px', fontWeight: '600', fontSize: '12px' }}>🟢 Available</span>;
      case 'Partially Available':
        return <span style={{ background: '#fef3c7', color: '#b45309', padding: '4px 8px', borderRadius: '6px', fontWeight: '600', fontSize: '12px' }}>🟡 Partially Available</span>;
      case 'Fully Allocated':
        return <span style={{ background: '#fee2e2', color: '#b91c1c', padding: '4px 8px', borderRadius: '6px', fontWeight: '600', fontSize: '12px' }}>🔴 Fully Allocated</span>;
      case 'On Leave':
        return <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 8px', borderRadius: '6px', fontWeight: '600', fontSize: '12px' }}>⚫️ On Leave</span>;
      default:
        return null;
    }
  };

  return (
    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px', flex: '1', minWidth: '280px' }}>
          <input
            type="text"
            placeholder="🔍 Search employee by name, role, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', flex: '1' }}
          />
          <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Infrastructure">Infrastructure</option>
          </select>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
        <thead>
          <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
            <th style={{ padding: '12px' }}>Employee Name</th>
            <th style={{ padding: '12px' }}>Role</th>
            <th style={{ padding: '12px' }}>Department</th>
            <th style={{ padding: '12px' }}>Status</th>
            <th style={{ padding: '12px' }}>Utilization</th>
            <th style={{ padding: '12px' }}>Account Status</th>
            <th style={{ padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees
            .filter((e) => {
              const matchSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.role.toLowerCase().includes(searchQuery.toLowerCase());
              const matchDept = departmentFilter === 'All' || e.department === departmentFilter;
              return matchSearch && matchDept;
            })
            .map((emp) => (
              <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9', opacity: emp.isActive ? 1 : 0.6 }}>
                <td style={{ padding: '12px' }}>
                  <div style={{ fontWeight: '600', color: '#0f172a' }}>{emp.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{emp.email}</div>
                </td>
                <td style={{ padding: '12px', fontWeight: '500', color: '#1e293b' }}>{emp.role}</td>
                <td style={{ padding: '12px' }}>{emp.department}</td>
                <td style={{ padding: '12px' }}>{getStatusBadge(emp.status)}</td>
                <td style={{ padding: '12px', fontWeight: '600' }}>{emp.utilization}%</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: emp.isActive ? '#16a34a' : '#dc2626' }}>
                    {emp.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button onClick={() => setSelectedEmployee(emp)} style={{ padding: '4px 8px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', marginRight: '6px', cursor: 'pointer' }}>Profile</button>
                  <button onClick={() => onToggleStatus(emp.id)} style={{ padding: '4px 8px', background: emp.isActive ? '#fef2f2' : '#f0fdf4', color: emp.isActive ? '#dc2626' : '#16a34a', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}>
                    {emp.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {selectedEmployee && (
        <div style={{ marginTop: '24px', padding: '20px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ margin: '0 0 4px' }}>👤 {selectedEmployee.name}</h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>{selectedEmployee.role} • {selectedEmployee.department}</p>
            </div>
            <button onClick={() => setSelectedEmployee(null)} style={{ padding: '4px 12px', cursor: 'pointer' }}>Close</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px', fontSize: '13px' }}>
            <div>
              <p><b>Role:</b> {selectedEmployee.role}</p>
              <p><b>Email:</b> {selectedEmployee.email}</p>
              <p><b>Workload Capacity:</b> {selectedEmployee.workloadHours} / {selectedEmployee.maxHours} hrs/wk</p>
              <p><b>Active Projects:</b> {selectedEmployee.activeProjects.join(', ') || 'None'}</p>
            </div>
            <div>
              <p><b>Skills:</b> {selectedEmployee.skills.join(', ')}</p>
              <p><b>Status:</b> {selectedEmployee.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}