import React, { useState } from 'react';

export default function ChangeRequestPage() {
  const [changes] = useState([
    { id: 1, title: 'Extend Deadline', reason: 'Database Migration Delay', status: 'Pending' }
  ]);

  return (
    <div style={{ padding: "20px", width: "100%", boxSizing: "border-box" }}>
      <h2>Change Request Management</h2>
      <br />
      
      <button style={{ padding: "10px 15px", background: "#f0ad4e", color: "white", border: "none", cursor: "pointer", marginBottom: "20px" }}>
        + Request Project Change
      </button>

      <h3>Submitted Change Requests</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto", border: "1px solid #ddd" }}>
        <thead>
          <tr style={{ background: "#f2f2f2", borderBottom: "2px solid #ddd" }}>
            <th style={{ padding: "12px 12px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "12px 12px", textAlign: "left" }}>Request Title</th>
            <th style={{ padding: "12px 12px", textAlign: "left" }}>Reason / Description</th>
            <th style={{ padding: "12px 12px", textAlign: "left" }}>Status</th>
            <th style={{ padding: "12px 12px", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {changes.map((item) => (
            <tr key={item.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "12px 12px" }}>{item.id}</td>
              <td style={{ padding: "12px 12px" }}>{item.title}</td>
              <td style={{ padding: "12px 12px" }}>{item.reason}</td>
              <td style={{ padding: "12px 12px" }}>{item.status}</td>
              <td style={{ padding: "12px 12px" }}>
                <button style={{ marginRight: "5px", padding: "5px 10px", cursor: "pointer" }}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}