import React from 'react';

export default function WorkloadTab({ employees }) {
  return (
    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ marginTop: 0, marginBottom: '20px' }}>📊 Employee Workload Breakdown</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {employees.map((emp) => (
          <div key={emp.id} style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <span style={{ fontWeight: '700', fontSize: '15px' }}>{emp.name}</span>
                <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '8px' }}>({emp.role})</span>
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>
                {emp.workloadHours} / {emp.maxHours} Hours Assigned ({emp.utilization}%)
              </span>
            </div>

            <div style={{ height: '12px', background: '#e2e8f0', borderRadius: '6px', overflow: 'hidden', marginBottom: '10px' }}>
              <div
                style={{
                  width: `${emp.utilization}%`,
                  background: emp.utilization > 90 ? '#ef4444' : emp.utilization > 50 ? '#f59e0b' : '#10b981',
                  height: '100%',
                  transition: 'width 0.4s ease'
                }}
              ></div>
            </div>

            <div style={{ fontSize: '12px', color: '#475569' }}>
              <b>Active Projects:</b> {emp.activeProjects.length > 0 ? emp.activeProjects.join(' • ') : 'No projects assigned'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}