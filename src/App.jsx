import React, { useMemo, useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
import ChartView from "./components/ChartView";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [transactions, setTransactions] = useLocalStorage("expenses", []);
  const [filter, setFilter] = useState("All");
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const addTransaction = (data) => {
    const newTx = { id: Date.now(), ...data };
    setTransactions([newTx, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const categories = ["All", "Food", "Travel", "Shopping", "Bills", "Other"];

  const filtered = useMemo(() => {
    return filter === "All"
      ? transactions
      : transactions.filter((t) => t.category === filter);
  }, [transactions, filter]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className="app">
      <header className="header-row">
        <div>
          <h1>💰 Smart Expense Tracker</h1>
          <p className="subtitle">Track your income and expenses easily</p>
        </div>
        <div className="header-controls">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </header>

      <TransactionForm onAdd={addTransaction} categories={categories} />

      <div className="filter">
        <label>Filter by Category:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <Summary transactions={filtered} />
      <ChartView transactions={filtered} />

      <TransactionList transactions={filtered} onDelete={deleteTransaction} />
    </div>
  );
}
