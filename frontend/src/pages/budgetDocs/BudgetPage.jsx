import React, { useState } from 'react';

export default function BudgetPage() {
  const [budgets] = useState([
    { id: 1, category: 'Software Licenses', allocated: '$5,000', spent: '$3,200', status: 'On Track' },
    { id: 2, category: 'Hardware & Equipment', allocated: '$10,000', spent: '$9,500', status: 'Near Limit' },
  ]);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Budget & Expense Management</h3>
      <button style={{ backgroundColor: "#f39c12", color: "white", padding: "10px 15px", border: "none", borderRadius: "4px", cursor: "pointer", marginBottom: "20px" }}>
        + Add New Budget / Expense
      </button>

      <table style={{ width: "100%", borderCollapse: "collapse", background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <thead>
          <tr style={{ background: "#f8f9fa", textAlign: "left", borderBottom: "2px solid #dee2e6" }}>
            <th style={{ padding: "12px" }}>ID</th>
            <th style={{ padding: "12px" }}>Category</th>
            <th style={{ padding: "12px" }}>Allocated Budget</th>
            <th style={{ padding: "12px" }}>Spent Amount</th>
            <th style={{ padding: "12px" }}>Status</th>
            <th style={{ padding: "12px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((item) => (
            <tr key={item.id} style={{ borderBottom: "1px solid #dee2e6" }}>
              <td style={{ padding: "12px" }}>{item.id}</td>
              <td style={{ padding: "12px" }}>{item.category}</td>
              <td style={{ padding: "12px" }}>{item.allocated}</td>
              <td style={{ padding: "12px" }}>{item.spent}</td>
              <td style={{ padding: "12px", color: item.status === 'On Track' ? 'green' : 'orange', fontWeight: 'bold' }}>
                {item.status}
              </td>
              <td style={{ padding: "12px" }}>
                <button style={{ marginRight: "5px", padding: "5px 10px" }}>Edit</button>
                <button style={{ color: "red", padding: "5px 10px" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}