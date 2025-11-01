import React from "react";
import type { Transaction } from "../types/Transaction";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface ReportsProps {
  transactions: Transaction[];
  categories: string[];
  view: "month" | "year";
  setView: React.Dispatch<React.SetStateAction<"month" | "year">>;
}

export function Reports({ transactions, categories, view, setView }: ReportsProps) {
  const now = new Date();

  const filtered = transactions.filter((tx) => {
    const d = new Date(tx.date);
    if (view === "month")
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    return d.getFullYear() === now.getFullYear();
  });

  const incomes = filtered.filter((t) => t.type === "income");
  const expenses = filtered.filter((t) => t.type === "expense");

  const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

  const categoryData = categories.map((cat) => {
    const catExpense = expenses.filter((t) => t.category === cat).reduce((s, t) => s + t.amount, 0);
    return { category: cat, amount: catExpense };
  });

  const sorted = [...filtered].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  let runningBalance = 0;
  const lineData = sorted.map((t) => {
    runningBalance += t.type === "income" ? t.amount : -t.amount;
    return { date: t.date, balance: runningBalance };
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Reports</h2>
        <div className="space-x-2">
          <button
            onClick={() => setView("month")}
            className={`px-3 py-1 text-sm rounded-md ${
              view === "month" ? "bg-blue-500 text-white" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            Current Month
          </button>
          <button
            onClick={() => setView("year")}
            className={`px-3 py-1 text-sm rounded-md ${
              view === "year" ? "bg-blue-500 text-white" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            Current Year
          </button>
        </div>
      </div>

      <div className="bg-white/10 p-4 rounded-lg shadow border border-white/20">
        <h3 className="text-md mb-3 text-white font-semibold">Monthly overview</h3>
        <div className="flex flex-col sm:flex-row justify-around text-center">
          <div>
            <p className="text-green-400 text-lg font-bold">{totalIncome.toFixed(2)} €</p>
            <p className="text-xs text-gray-300">Incomes</p>
          </div>
          <div>
            <p className="text-red-400 text-lg font-bold">{totalExpense.toFixed(2)} €</p>
            <p className="text-xs text-gray-300">Expenses</p>
          </div>
          <div>
            <p
              className={`text-lg font-bold ${
                totalIncome - totalExpense >= 0 ? "text-green-300" : "text-red-300"
              }`}
            >
              {(totalIncome - totalExpense).toFixed(2)} €
            </p>
            <p className="text-xs text-gray-300">Saldo</p>
          </div>
        </div>
      </div>

      <div className="bg-white/10 p-4 rounded-lg border border-white/20 shadow">
        <h3 className="text-md mb-3 text-white font-semibold">Category Breakdown</h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="category" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="amount" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white/10 p-4 rounded-lg border border-white/20 shadow">
        <h3 className="text-md mb-3 text-white font-semibold">Course</h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="balance" stroke="#60a5fa" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
