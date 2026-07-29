import React from 'react';

export default function ReportsTab({ employees, assignments }) {
  // Total capacity calculations
  const totalEmployees = employees.length;
  const totalMaxHours = totalEmployees * 40;
  const totalAllocatedHours = employees.reduce((acc, curr) => acc + curr.workloadHours, 0);
  const totalAvailableHours = totalMaxHours - totalAllocatedHours;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. Existing Departmental Summary */}
      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ marginTop: 0, marginBottom: '8px' }}>📈 Departmental Capacity Summary</h3>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Overview of team capacity allocation across departments.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {['Engineering', 'Design', 'Infrastructure'].map((dept) => {
            const deptEmps = employees.filter((e) => e.department === dept);
            const totalDeptHours = deptEmps.reduce((acc, curr) => acc + curr.workloadHours, 0);
            const maxDeptHours = deptEmps.length * 40;
            const deptUtil = maxDeptHours > 0 ? Math.round((totalDeptHours / maxDeptHours) * 100) : 0;

            return (
              <div key={dept} style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 8px', fontSize: '15px' }}>{dept}</h4>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#2563eb', marginBottom: '4px' }}>{deptUtil}%</div>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                  {totalDeptHours} / {maxDeptHours} total hours allocated across {deptEmps.length} resource(s).
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Availability Report */}
      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0 }}>🟢 Availability Report</h3>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>Unassigned capacity and bench strength breakdown.</p>
          </div>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '8px 14px', borderRadius: '8px', textAlign: 'right' }}>
            <span style={{ fontSize: '12px', color: '#166534', fontWeight: '600' }}>Total Available Bench: </span>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#15803d' }}>{totalAvailableHours} hrs/wk</span>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px' }}>Employee</th>
              <th style={{ padding: '10px' }}>Role</th>
              <th style={{ padding: '10px' }}>Current Status</th>
              <th style={{ padding: '10px' }}>Available Hours</th>
              <th style={{ padding: '10px' }}>Availability %</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => {
              const freeHours = emp.maxHours - emp.workloadHours;
              const freePct = Math.round((freeHours / emp.maxHours) * 100);
              return (
                <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>{emp.name}</td>
                  <td style={{ padding: '10px', color: '#475569' }}>{emp.role}</td>
                  <td style={{ padding: '10px' }}>{emp.status}</td>
                  <td style={{ padding: '10px', fontWeight: '600', color: freeHours > 0 ? '#16a34a' : '#94a3b8' }}>{freeHours} hrs/wk</td>
                  <td style={{ padding: '10px', fontWeight: '600' }}>{freePct}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 3. Allocation Report */}
      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ marginTop: 0, marginBottom: '4px' }}>📋 Allocation Report</h3>
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>Active task allocations per resource and project involvement.</p>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px' }}>Project</th>
              <th style={{ padding: '10px' }}>Assigned Employee</th>
              <th style={{ padding: '10px' }}>Task</th>
              <th style={{ padding: '10px' }}>Allocated Hours</th>
              <th style={{ padding: '10px' }}>Date Assigned</th>
            </tr>
          </thead>
          <tbody>
            {assignments && assignments.length > 0 ? (
              assignments.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px', fontWeight: '600', color: '#2563eb' }}>{item.project}</td>
                  <td style={{ padding: '10px' }}>{item.employeeName}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{item.task}</td>
                  <td style={{ padding: '10px', fontWeight: '600' }}>{item.allocatedHours} hrs/wk</td>
                  <td style={{ padding: '10px', fontSize: '12px', color: '#64748b' }}>{item.assignedDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ padding: '16px', textAlign: 'center', color: '#94a3b8' }}>No active assignments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 4. Workload Report */}
      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ marginTop: 0, marginBottom: '4px' }}>📊 Workload & Over-Allocation Report</h3>
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>Current utilization loads across all staff members.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {employees.map((emp) => {
            const isOverloaded = emp.utilization > 100;
            return (
              <div key={emp.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ width: '180px', fontWeight: '600', fontSize: '14px' }}>
                  {emp.name}
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'normal' }}>{emp.role}</div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>
                    <span>{emp.workloadHours} / {emp.maxHours} hrs</span>
                    <span style={{ color: isOverloaded ? '#dc2626' : emp.utilization === 100 ? '#d97706' : '#16a34a' }}>
                      {emp.utilization}% Utilization {isOverloaded ? '⚠️ Overloaded' : ''}
                    </span>
                  </div>
                  <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${Math.min(emp.utilization, 100)}%`,
                        background: isOverloaded ? '#dc2626' : emp.utilization === 100 ? '#f59e0b' : '#2563eb',
                        height: '100%'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}