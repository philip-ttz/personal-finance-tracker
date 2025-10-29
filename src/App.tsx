import React, { useState } from 'react'
import './App.css'
import { TransactionForm } from './components/TransactionForm'
import type { Transaction } from './types/Transaction'
import { TransactionList } from './components/TransactionList'
import { CategoryManager } from './components/CategoryManager'
import { renderToPipeableStream } from 'react-dom/server'

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<string[]>(["rent", "groceries", "salary", "entertainment"]);

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

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  }
  const removeCategory = (category: string) => {
    setCategories(categories.filter(cat => cat !== category));
  }
  const updateCategory = (oldCategory: string, newCategory: string) => {
    setCategories(categories.map(cat => (cat === oldCategory ? newCategory : cat)));
  }

  return (
    <>
    
      <aside className='w-80 rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden space-y-6'>
        <TransactionForm addTransaction={addTransaction} categories={categories} />
        <CategoryManager
          categories={categories}
          addCategory={addCategory}
          removeCategory={removeCategory}
          updateCategory={updateCategory}
        />
      </aside>
      <main>
      <TransactionList transactions={transactions} removeTransaction={removeTransaction} />
    </main>
    </>
  )
}

export default App
