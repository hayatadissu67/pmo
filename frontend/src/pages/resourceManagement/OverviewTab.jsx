import React from 'react';

export default function OverviewTab({ employees, assignments, onNavigate }) {
  const totalEmployees = employees.length;
  const availableResources = employees.filter((e) => e.status === 'Available' || e.status === 'Partially Available').length;
  const busyResources = employees.filter((e) => e.status === 'Fully Allocated').length;
  const onLeaveResources = employees.filter((e) => e.status === 'On Leave').length;

  const totalUtilization = employees.reduce((acc, curr) => acc + curr.utilization, 0);
  const avgUtilization = totalEmployees > 0 ? Math.round(totalUtilization / totalEmployees) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Total Employees</span>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#2563eb', marginTop: '4px' }}>{totalEmployees}</div>
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Available Resources</span>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#16a34a', marginTop: '4px' }}>{availableResources}</div>
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Busy (Fully Allocated)</span>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#dc2626', marginTop: '4px' }}>{busyResources}</div>
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>On Leave</span>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#475569', marginTop: '4px' }}>{onLeaveResources}</div>
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Resource Utilization (%)</span>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#8b5cf6', marginTop: '4px' }}>{avgUtilization}%</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px' }}>📋 Recent Resource Assignments</h3>
            <button onClick={onNavigate} style={{ padding: '6px 12px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>+ New Allocation</button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '10px' }}>Employee</th>
                <th style={{ padding: '10px' }}>Project</th>
                <th style={{ padding: '10px' }}>Task</th>
                <th style={{ padding: '10px' }}>Hours Allocated</th>
              </tr>
            </thead>
            <tbody>
              {assignments.slice(0, 5).map((a) => (
                <tr key={a.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>{a.employeeName}</td>
                  <td style={{ padding: '10px' }}>{a.project}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{a.task}</td>
                  <td style={{ padding: '10px', fontWeight: '600', color: '#2563eb' }}>{a.allocatedHours} hrs/wk</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ marginTop: 0, fontSize: '18px', marginBottom: '16px' }}>⚡ Quick Statistics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                <span>Resource Utilization Rate</span>
                <span style={{ color: '#8b5cf6' }}>{avgUtilization}%</span>
              </div>
              <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${avgUtilization}%`, background: '#8b5cf6', height: '100%' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                <span>Capacity Allocated</span>
                <span>{Math.round((employees.reduce((a, c) => a + c.workloadHours, 0) / (totalEmployees * 40)) * 100)}%</span>
              </div>
              <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.round((employees.reduce((a, c) => a + c.workloadHours, 0) / (totalEmployees * 40)) * 100)}%`, background: '#2563eb', height: '100%' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                <span>Bench Strength (Free Capacity)</span>
                <span>{100 - avgUtilization}%</span>
              </div>
              <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${100 - avgUtilization}%`, background: '#16a34a', height: '100%' }}></div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '6px' }}>
              <h4 style={{ margin: '0 0 6px', fontSize: '13px', color: '#475569' }}>💡 Resource Insight</h4>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                {availableResources} employee(s) currently have open capacity for incoming Sprint assignments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}