import React from 'react';

export default function SkillsRolesTab({ employees }) {
  return (
    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ marginTop: 0, marginBottom: '20px' }}>🛠 Employee Skills & Functional Roles</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
        <thead>
          <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
            <th style={{ padding: '12px' }}>Employee</th>
            <th style={{ padding: '12px' }}>Role</th>
            <th style={{ padding: '12px' }}>Skills Matrix</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '12px', fontWeight: '600' }}>{emp.name}</td>
              <td style={{ padding: '12px', color: '#475569' }}>{emp.role}</td>
              <td style={{ padding: '12px' }}>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {emp.skills.map((skill, index) => (
                    <span key={index} style={{ background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}