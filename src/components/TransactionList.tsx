import React, { useState } from 'react';
import type { Transaction } from '../types/Transaction';

interface TransactionListProps {
  transactions: Transaction[];
  removeTransaction: (id: number) => void;
}

export function TransactionList({ transactions, removeTransaction }: TransactionListProps) {
  const [filterType, setFilterType] = useState<'all' | 'date' | 'account' | 'category' >('all');
  const [filterValues, setFilterValues] = useState({
    startDate: '',
    endDate: '',
    account: '',
    category: '',
  });

  const uniqueAccounts = Array.from(new Set(transactions.map(tx => tx.account)));
  const uniqueCategories = Array.from(new Set(transactions.map(tx => tx.category)));

  const filteredTransactions = transactions.filter((tx) => {
    if (filterType === 'date') {
        if (filterValues.startDate && tx.date < filterValues.startDate) return false;
        if (filterValues.endDate && tx.date > filterValues.endDate) return false;
    } else if (filterType === 'account' && filterValues.account) {
        return tx.account === filterValues.account;    
    } else if (filterType === 'category' && filterValues.category) {
        return tx.category === filterValues.category;    
    }
    return true;
  });


  const incomes = filteredTransactions.filter(tx => tx.type === "income");
  const expenses = filteredTransactions.filter(tx => tx.type === "expense");

  return (
    <div className="grid grid-cols-[8fr_1fr] gap-4 p-4 w-full">
        <div className='grid grid-cols-2 gap-4'>
      <div className="space-y-2 p-4">
        <h2 className="text-m font-semibold text-green-700 mb-2">Incomes</h2>
        {incomes.length === 0 && <p className="text-gray-500 text-xs">No incomes</p>}
        {incomes.map(tx => (
          <div
            key={tx.id}
            role="alert"
            className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800 transform hover:scale-105 justify-between"
          >
            <p className="text-xs font-semibold truncate">
              {tx.category}
            </p>
            <p className="text-xs">
              {tx.amount.toFixed(2)} €
            </p>
            <button onClick={() => removeTransaction(tx.id)} className="text-sm text-green-700 dark:text-green-200 ml-2 hover:underline">
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-2 p-4 ">
        <h2 className="text-m font-semibold text-red-700 mb-2">Expenses</h2>
        {expenses.length === 0 && <p className="text-gray-500 text-xs">No expenses</p>}
        {expenses.map(tx => (
          <div
            key={tx.id}
            role="alert"
            className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105 justify-between"
          >
            <p className="text-xs font-semibold truncate">
              {tx.category}
            </p>
            <p className="text-xs">
              {tx.amount.toFixed(2)} €
            </p>
            <button onClick={() => removeTransaction(tx.id)} className="text-sm text-red-700 dark:text-red-200 ml-2 hover:underline">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white p-4 rounded-lg shadow space-y-3 h-fit w-35">
        <h3 className="font-semibold text-slate-700 mb-2 text-sm">Filter</h3>

        <div className="flex flex-col gap-2">
          {(["all", "date", "account", "category"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded text-sm ${
                filterType === type ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {type === "all"
                ? "All"
                : type === "date"
                ? "Period"
                : type === "account"
                ? "Account"
                : "Category"}
            </button>
          ))}
        </div>

        {filterType === "date" && (
          <div className="flex flex-col gap-2 mt-3">
            <input
              type="date"
              value={filterValues.startDate}
              onChange={(e) => setFilterValues({ ...filterValues, startDate: e.target.value })}
              className="border px-2 py-1 rounded text-sm"
            />
            <input
              type="date"
              value={filterValues.endDate}
              onChange={(e) => setFilterValues({ ...filterValues, endDate: e.target.value })}
              className="border px-2 py-1 rounded text-sm w-full"
            />
          </div>
        )}

        {filterType === "account" && (
          <select
            value={filterValues.account}
            onChange={(e) => setFilterValues({ ...filterValues, account: e.target.value })}
            className="border px-2 py-1 rounded text-sm w-full mt-3"
          >
            <option value="">All accounts</option>
            {uniqueAccounts.map((acc) => (
              <option key={acc} value={acc}>
                {acc}
              </option>
            ))}
          </select>
        )}

        {filterType === "category" && (
          <select
            value={filterValues.category}
            onChange={(e) => setFilterValues({ ...filterValues, category: e.target.value })}
            className="border px-2 py-1 rounded text-sm w-full mt-3"
          >
            <option value="">All categories</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}