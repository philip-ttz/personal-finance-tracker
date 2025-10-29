import { useState } from 'react'
import './App.css'
import { TransactionForm } from './components/TransactionForm'


interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  date: string;
  category: string;
  account: string;
  tag: string;
}

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
    setTransactions([...transactions, newTransaction]);
    console.log('Transaction Added:', newTransaction);
  }

  return (
    <>
      <main className='w-80 rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden'>
        <TransactionForm addTransaction={addTransaction} />
      </main>
    </>
  )
}

export default App
