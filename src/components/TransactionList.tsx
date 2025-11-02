import { useState } from 'react';
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

const resetActiveFilter = () => {
  if (filterType === 'date') {
    setFilterValues(prev => ({ ...prev, startDate: '', endDate: '' }));
  } else if (filterType === 'account') {
    setFilterValues(prev => ({ ...prev, account: '' }));
  } else if (filterType === 'category') {
    setFilterValues(prev => ({ ...prev, category: '' }));
  }
};

const resetAllFilters = () => {
  setFilterType('all');
  setFilterValues({
    startDate: '',
    endDate: '',
    account: '',
    category: '',
  });
};


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
    <div className="grid grid-cols-[8fr_1fr] gap-4 w-full">
        <div className='grid grid-cols-2 gap-4'>
      <div className="space-y-2 p-4 bg-green-100/20 rounded-2xl">
        <h2 className="text-m font-semibold text-green-400 mb-2">Incomes</h2>
        {incomes.length === 0 && <p className="text-gray-300 text-xs">No incomes</p>}
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

      <div className="space-y-2 p-4 bg-red-100/20 rounded-2xl">
        <h2 className="text-m font-semibold text-red-400 mb-2">Expenses</h2>
        {expenses.length === 0 && <p className="text-gray-300 text-xs">No expenses</p>}
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

    <div className="backdrop-blur-md border border-white/30  bg-gray-300/10 p-4 rounded-2xl shadow space-y-3 h-fit w-35 ">
        <h3 className="font-semibold text-white text-slate-700 mb-2 text-sm">Filter</h3>

        <div className="flex flex-col gap-2">
          {(["all", "date", "account", "category"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded text-sm ${
                filterType === type ? "bg-blue-600/50 text-white" : "bg-gray-750/50 hover:bg-blue-600/20 text-white"
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
              className="text-white border px-2 py-1 rounded text-sm"
            />
            <input
              type="date"
              value={filterValues.endDate}
              onChange={(e) => setFilterValues({ ...filterValues, endDate: e.target.value })}
              className="text-white border px-2 py-1 rounded text-sm w-full"
            />
          </div>
        )}

        {filterType === "account" && (
          <select
            value={filterValues.account}
            onChange={(e) => setFilterValues({ ...filterValues, account: e.target.value })}
            className="text-white border px-2 py-1 rounded text-sm w-full mt-3"
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
            className="text-white border px-2 py-1 rounded text-sm w-full mt-3"
          >
            <option value="">All categories</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}
        <div className="flex flex-col gap-2 mt-4">
    <button
      onClick={resetActiveFilter}
      className="bg-gray-500/60 hover:bg-yellow-500/30 text-white text-xs rounded-md py-1 transition"
    >
      Reset current filter
    </button>
    <button
      onClick={resetAllFilters}
      className="bg-gray-500/60 hover:bg-red-500/30 text-white text-xs rounded-md py-1 transition"
    >
      Reset all filters
    </button>
  </div>
      </div>
    </div>
  );
}