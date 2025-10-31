import React from "react";

export default function TransactionList({ transactions, onDelete }) {
  if (!transactions.length)
    return <p className="empty">No transactions yet.</p>;

  return (
    <ul className="list">
      {transactions.map((t) => (
        <li key={t.id} className={t.type}>
          <div>
            <strong>{t.text}</strong> <span>({t.category})</span>
          </div>
          <div className="right">
            <span>{t.type === "income" ? "+" : "-"}₹{t.amount}</span>
            <button onClick={() => onDelete(t.id)}>❌</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
