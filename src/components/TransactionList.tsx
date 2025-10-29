import React from 'react';
import type { Transaction } from '../types/Transaction';

interface TransactionListProps {
  transactions: Transaction[];
  removeTransaction: (id: number) => void;
}

/*export function TransactionList({ transactions, removeTransaction }: TransactionListProps) {
    if (transactions.length === 0) {
    return <p className="text-center text-slate-500 mt-4">No transactions available.</p>;
  }

    return (
        <ul className="mt-4 space-y-2 max-h-64 overflow-y-auto">
      {transactions.map((transaction) => (
        <li key={transaction.id} className="flex justify-between items-center border-b pb-2">
          <div>
            <p className="text-slate-700 font-medium">{transaction.type === 'income' ? 'Income' : 'Expense'}: ${transaction.amount.toFixed(2)}</p>
            <p className="text-slate-500 text-sm">{transaction.date} | {transaction.category} | {transaction.account} | {transaction.tag}</p>
          </div>
          <button
            onClick={() => removeTransaction(transaction.id)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
    );
}*/
export function TransactionList({ transactions, removeTransaction }: TransactionListProps) {
  // Transaktionen nach Typ trennen
  const incomes = transactions.filter(tx => tx.type === "income");
  const expenses = transactions.filter(tx => tx.type === "expense");

  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="space-y-2 p-4">
        <h2 className="text-sm font-semibold mb-2">Incomes</h2>
        {incomes.length === 0 && <p className="text-gray-500 text-xs">No incomes</p>}
        {incomes.map(tx => (
          <div
            key={tx.id}
            role="alert"
            className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800 transform hover:scale-105 justify-between"
          >
            <p className="text-xs font-semibold">
              {tx.date} — {tx.category ?? "—"} — {tx.amount.toFixed(2)} €
            </p>
            <button onClick={() => removeTransaction(tx.id)} className="text-sm text-green-700 dark:text-green-200 ml-2 hover:underline">
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-2 p-4">
        <h2 className="text-sm font-semibold mb-2">Expenses</h2>
        {expenses.length === 0 && <p className="text-gray-500 text-xs">No expenses</p>}
        {expenses.map(tx => (
          <div
            key={tx.id}
            role="alert"
            className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105 justify-between"
          >
            <p className="text-xs font-semibold">
              {tx.date} — {tx.category ?? "—"} — {tx.amount.toFixed(2)} €
            </p>
            <button onClick={() => removeTransaction(tx.id)} className="text-sm text-red-700 dark:text-red-200 ml-2 hover:underline">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}