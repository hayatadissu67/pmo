import React, { useState } from 'react';

export default function ExpenseTracking() {
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'AWS Cloud Hosting', category: 'Infrastructure', amount: 1200, date: '2026-07-20', receipt: null },
  ]);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const handleRecordExpense = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    if (editingId !== null) {
      // Edit Expense
      setExpenses(expenses.map(item => 
        item.id === editingId ? { ...item, title, category, amount: Number(amount), receipt: receipt ? receipt.name : item.receipt } : item
      ));
      setEditingId(null);
    } else {
      // Record New Expense
      const newExpense = {
        id: Date.now(),
        title,
        category: category || 'General',
        amount: Number(amount),
        date: new Date().toISOString().split('T')[0],
        receipt: receipt ? receipt.name : null
      };
      setExpenses([newExpense, ...expenses]);
    }

    setTitle('');
    setCategory('');
    setAmount('');
    setReceipt(null);
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setTitle(expense.title);
    setCategory(expense.category);
    setAmount(expense.amount);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Record / Edit Form Section */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {editingId !== null ? 'Edit Expense' : 'Record Expense'}
        </h3>
        <p className="text-sm text-gray-500 mb-4">Add or modify expense entries and attach corresponding receipts.</p>
        
        <form onSubmit={handleRecordExpense} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input 
            type="text" 
            placeholder="Expense Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
          <input 
            type="text" 
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
          <input 
            type="number" 
            placeholder="Amount ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
          <div className="flex items-center gap-2">
            <input 
              type="file" 
              onChange={(e) => setReceipt(e.target.files[0])}
              className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>
          <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
            <button 
              type="submit"
              className="py-2.5 px-6 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
            >
              {editingId !== null ? 'Update Expense' : 'Save Expense'}
            </button>
          </div>
        </form>
      </div>

      {/* Expense List & Records Section */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Expense List & Records</h3>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b text-gray-400">
              <th className="pb-3 font-medium">Title</th>
              <th className="pb-3 font-medium">Category</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Receipt</th>
              <th className="pb-3 font-medium text-right">Amount</th>
              <th className="pb-3 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {expenses.map(e => (
              <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 font-medium text-gray-800">{e.title}</td>
                <td className="py-3 text-gray-500">{e.category}</td>
                <td className="py-3 text-gray-500">{e.date}</td>
                <td className="py-3 text-xs text-blue-600 font-medium">
                  {e.receipt ? e.receipt : 'No Receipt'}
                </td>
                <td className="py-3 text-right font-bold">${e.amount.toLocaleString()}</td>
                <td className="py-3 text-center space-x-2">
                  <button 
                    onClick={() => handleEdit(e)}
                    className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-xs font-semibold hover:bg-amber-100 transition-colors cursor-pointer"
                  >
                    Edit Expense
                  </button>
                  <button 
                    onClick={() => handleDelete(e.id)}
                    className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors cursor-pointer"
                  >
                    Delete Expense
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}