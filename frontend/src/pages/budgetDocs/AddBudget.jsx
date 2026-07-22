import React, { useState } from 'react';

export default function AddBudget() {
  const [budgetName, setBudgetName] = useState('');
  const [totalBudget, setTotalBudget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Asitti daataa gara Backend/API ykn State-tti ergita
    console.log("Budget Saved:", { budgetName, totalBudget });
    alert("Budget successfully saved!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add New Budget</h1>
      <br />
      
      <form onSubmit={handleSubmit}>
        <label>Budget Name</label>
        <br />
        <input 
          type="text" 
          placeholder="Enter Budget Name" 
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
          required
        />
        <br /><br />

        <label>Total Budget</label>
        <br />
        <input 
          type="number" 
          placeholder="Enter Amount" 
          value={totalBudget}
          onChange={(e) => setTotalBudget(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Save Budget</button>
      </form>
    </div>
  );
}