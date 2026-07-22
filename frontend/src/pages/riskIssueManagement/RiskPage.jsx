import React, { useState } from 'react';

export default function RiskPage() {
  const [risks, setRisks] = useState([
    { id: 1, title: 'Delay in API Integration', severity: 'High', status: 'Open' },
    { id: 2, title: 'Budget Overrun Risk', severity: 'Medium', status: 'In Progress' }
  ]);

  return (
    <div style={{ padding: "20px", width: "100%", boxSizing: "border-box" }}>
      <h1>Risk & Issue Management</h1>
      <br />
      
      <button style={{ padding: "10px 15px", background: "#d9534f", color: "white", border: "none", cursor: "pointer", marginBottom: "20px" }}>
        + Report New Risk / Issue
      </button>

      <h3>Active Risks & Issues</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto", border: "1px solid #ddd" }}>
        <thead>
          <tr style={{ background: "#f2f2f2", borderBottom: "2px solid #ddd" }}>
            <th style={{ padding: "12px 12px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "12px 12px", textAlign: "left" }}>Risk / Issue Title</th>
            <th style={{ padding: "12px 12px", textAlign: "left" }}>Severity</th>
            <th style={{ padding: "12px 12px", textAlign: "left" }}>Status</th>
            <th style={{ padding: "12px 12px", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {risks.map((item) => (
            <tr key={item.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "12px 12px" }}>{item.id}</td>
              <td style={{ padding: "12px 12px" }}>{item.title}</td>
              <td style={{ padding: "12px 12px", color: item.severity === 'High' ? 'red' : 'orange', fontWeight: 'bold' }}>
                {item.severity}
              </td>
              <td style={{ padding: "12px 12px" }}>{item.status}</td>
              <td style={{ padding: "12px 12px" }}>
                <button style={{ marginRight: "5px", padding: "5px 10px", cursor: "pointer" }}>Edit</button>
                <button style={{ color: "red", padding: "5px 10px", cursor: "pointer" }}>Resolve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}