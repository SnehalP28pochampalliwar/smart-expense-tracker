import React, { useMemo } from "react";

export default function Summary({ transactions }) {
  const { income, expense, balance } = useMemo(() => {
    let income = 0,
      expense = 0;
    transactions.forEach((t) => {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    });
    return { income, expense, balance: income - expense };
  }, [transactions]);

  return (
    <div className="summary">
      <div className="card income">Income: ₹{income.toFixed(2)}</div>
      <div className="card expense">Expense: ₹{expense.toFixed(2)}</div>
      <div className="card balance">Balance: ₹{balance.toFixed(2)}</div>
    </div>
  );
}
