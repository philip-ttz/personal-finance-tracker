import React, { useState } from 'react'
import './App.css'
import { TransactionForm } from './components/TransactionForm'
import type { Transaction } from './types/Transaction'
import { TransactionList } from './components/TransactionList'
import { CategoryManager } from './components/CategoryManager'
import { Navbar } from './components/Navbar'
import { Budgeting } from "./components/Budgeting"

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<string[]>(["rent", "groceries", "salary", "entertainment"]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [recentlyDeleted, setRecentlyDeleted] = useState<Transaction | null>(null);
  const [showUndo, setShowUndo] = useState(false);
  const [budgets, setBudgets] = useState<Record<string, number>>({});

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
    const txToRemove = transactions.find(tx => tx.id === id);
    if(!txToRemove) return;

    const confirmed = window.confirm("Do you really want to delete this transaction?");
    if(!confirmed) return;

    setTransactions(prev => prev.filter(tx => tx.id !== id));
    setRecentlyDeleted(txToRemove);
    setShowUndo(true);

    setTimeout(() => {
      setShowUndo(false);
      setRecentlyDeleted(null);
    }, 5000);
  }

  const undoDelete = () => {
    if(recentlyDeleted) {
      setTransactions(prev => {
        const updated = [...prev, recentlyDeleted!];
        updated.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return updated;
      });
      setRecentlyDeleted(null);
      setShowUndo(false);
    }
  };

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

  const handleAddBudget = (category: string, amount: number) => {
    setBudgets((prev) => ({ ...prev, [category]: amount }));
  };

  const handleRemoveBudget = (category: string) => {
    setBudgets((prev) => {
      const copy = { ...prev };
      delete copy[category];
      return copy;
    });
  };

  return (
    <>
    <div className='navbar-area'>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
    
      {activeTab === "dashboard" && (
        <div className='content-area'>
      <aside className='w-70 text-white rounded-2xl shadow h-auto p-6 relative overflow-hidden space-y-6 backdrop-blur-md border border-white/30 w-full bg-gray-300/10'>
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
      </div>
      )}
      {activeTab === "budgeting" && (
        <Budgeting transactions={transactions} categories={categories}  budgets={budgets} onAddBudget={handleAddBudget} onRemoveBudget={handleRemoveBudget} />
      )}

      {activeTab === "Auswertungen" && (
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">Auswertungen</h2>
          <p className="text-slate-500">Hier erscheinen später Diagramme, Übersichten und Statistiken.</p>
        </div>
      )}
      

      {showUndo && (
        <div className="fixed bottom-6 right-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-3">
          <span className="text-sm">Transaction deleted.</span>
          <button
            onClick={undoDelete}
            className="text-blue-400 hover:text-blue-300 font-semibold text-sm"
          >
            Undo
          </button>
        </div>
      )}
    </>
  )
}

export default App
