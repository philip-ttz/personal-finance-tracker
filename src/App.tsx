import React, { useState } from 'react'
import './App.css'
import { TransactionForm } from './components/TransactionForm'
import type { Transaction } from './types/Transaction'
import { TransactionList } from './components/TransactionList'

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (type: 'income' | 'expense', amount: number, date: string, category: string, account: string, tag: string) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID() as unknown as number,
      type,
      amount,
      date,
      category,
      account,
      tag,
    };
    setTransactions(prev => {
      const updated = [...prev, newTransaction];
      updated.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return updated;
    });
    console.log('Transaction Added:', newTransaction);
  }

  const removeTransaction = (id: number) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  }

  return (
    <>
    
      <aside className='w-80 rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden'>
        <TransactionForm addTransaction={addTransaction} />
      </aside>
      <main>
      <TransactionList transactions={transactions} removeTransaction={removeTransaction} />
    </main>
    </>
  )
}

export default App
