import React, { useState } from 'react';

export default function AvailabilityTab({ employees }) {
  const [availabilityFilter, setAvailabilityFilter] = useState('All');

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>Availability Status Tracker</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600' }}>Filter Status:</label>
          <select value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
            <option value="All">All Statuses</option>
            <option value="Available">🟢 Available</option>
            <option value="Partially Available">🟡 Partially Available</option>
            <option value="Fully Allocated">🔴 Fully Allocated</option>
            <option value="On Leave">⚫️ On Leave</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {employees
          .filter((e) => availabilityFilter === 'All' || e.status === availabilityFilter)
          .map((emp) => (
            <div key={emp.id} style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h4 style={{ margin: 0, fontSize: '16px' }}>{emp.name}</h4>
                {getStatusBadge(emp.status)}
              </div>
              <p style={{ margin: '0 0 12px', fontSize: '12px', color: '#64748b' }}>{emp.role}</p>

              <div style={{ fontSize: '13px', color: '#334155' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>Free Capacity:</span>
                  <b>{emp.maxHours - emp.workloadHours} hrs/wk</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Current Utilization:</span>
                  <b>{emp.utilization}%</b>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}