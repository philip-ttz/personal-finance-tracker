import React, { useState } from 'react';

type TransactionType = 'income' | 'expense';

interface TransactionFormProps {
  addTransaction: (type: TransactionType, amount: number, date: string, category: string, account: string, tag: string) => void;
}

export function TransactionForm({ addTransaction }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>('income');
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [account, setAccount] = useState<string>('');
  const [tag, setTag] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction(type, amount, date, category, account, tag);
    setAmount(0);
    setDate('');
    setCategory('');
    setAccount('');
    setTag('');
  };

    return (
        <>
      <div className="flex flex-col justify-center items-center space-y-2">
        <h2 className="text-2xl font-medium text-slate-700">Personal Finance Tracker</h2>
      </div>
      <form onSubmit={handleSubmit} className="w-full mt-4 space-y-3">
        <div>
          <select value={type} onChange={(e) => setType(e.target.value as TransactionType)} className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
        </select>
        </div>
        <div>
          <input
            type="number"
            value={amount}
            step="0.01"
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Amount"
            className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
            required
        />
        </div>
        <div>
        <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
            required
        />
        </div>
        <div>
        <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
            required
        />
        </div>
        <div>
        <input
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder="Account"
            className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
            required
        />
        </div>
        <div>
        <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Tag"
            className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
        />
        </div>
        <button className="w-full justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2" id="login" name="login" type="submit">
          Submit
        </button>
      </form>
      </>
  );
}