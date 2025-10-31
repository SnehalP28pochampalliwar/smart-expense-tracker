import React, { useState } from "react";

export default function TransactionForm({ onAdd, categories }) {
  const [form, setForm] = useState({
    text: "",
    amount: "",
    type: "expense",
    category: "Other",
  });

  const submit = (e) => {
    e.preventDefault();
    if (!form.text || !form.amount) return;
    onAdd({ ...form, amount: parseFloat(form.amount) });
    setForm({ text: "", amount: "", type: "expense", category: "Other" });
  };

  return (
    <form className="form" onSubmit={submit}>
      <input
        placeholder="Description"
        value={form.text}
        onChange={(e) => setForm({ ...form, text: e.target.value })}
      />
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        {categories.slice(1).map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <button type="submit">Add</button>
    </form>
  );
}
