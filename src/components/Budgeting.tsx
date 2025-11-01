import React from "react";
import type { Transaction } from "../types/Transaction";

interface BudgetingProps {
  transactions: Transaction[];
  categories: string[];
  budgets: Record<string, number>;
  onAddBudget: (category: string, amount: number) => void;
  onRemoveBudget: (category: string) => void;
}

export function Budgeting({
  transactions,
  categories,
  budgets,
  onAddBudget,
  onRemoveBudget,
}: BudgetingProps) {
  const [newBudgetValues, setNewBudgetValues] = React.useState<Record<string, number>>({});

  const expensesByCategory = transactions
    .filter((tx) => tx.type === "expense")
    .reduce<Record<string, number>>((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {categories.map((cat) => {
        const budget = budgets[cat];
        const spent = expensesByCategory[cat] || 0;
        const overspent = budget && spent > budget;

        return (
          <div
            key={cat}
            className="p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-sm font-semibold text-white mb-3">{cat}</h2>

            {!budget ? (
              <div className="space-y-2">
                <input
                  type="number"
                  value={newBudgetValues[cat] || ""}
                  onChange={(e) =>
                    setNewBudgetValues((prev) => ({
                      ...prev,
                      [cat]: parseFloat(e.target.value),
                    }))
                  }
                  placeholder="Budget (€)"
                  className="w-full text-xs px-2 py-1 rounded-md bg-white/20 text-white/80 outline-none focus:ring focus:ring-blue-300"
                />
                <button
                  onClick={() => {
                    if (newBudgetValues[cat] && newBudgetValues[cat] > 0)
                      onAddBudget(cat, newBudgetValues[cat]);
                  }}
                  className="w-full bg-blue-500 text-white py-1 rounded-md text-xs hover:bg-blue-600 transition"
                >
                  Set Budget
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-gray-300">
                  <span>{spent.toFixed(2)} € spent</span>
                  <span>{budget.toFixed(2)} € Budget</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      overspent ? "bg-red-500" : "bg-green-500"
                    }`}
                    style={{ width: `${(spent / budget) * 100}%` }}
                  ></div>
                </div>

                {overspent && (
                  <p className="text-red-400 text-xs font-semibold">
                    ⚠️ Budget exceeded by {(spent - budget).toFixed(2)} €
                  </p>
                )}

                <button
                  onClick={() => onRemoveBudget(cat)}
                  className="text-xs text-red-400 hover:text-red-600 transition"
                >
                  Delete Budget
                </button>

                <div className="pt-2 border-t border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Expenses:</p>
                  <ul className="space-y-1 text-xs text-white/70 max-h-32 overflow-y-auto">
                    {transactions
                      .filter((tx) => tx.category === cat && tx.type === "expense")
                      .map((tx, i) => (
                        <li
                          key={i}
                          className="flex justify-between border-b border-white/5 pb-0.5"
                        >
                          <span>{tx.tag || "Keine Notiz"}</span>
                          <span className="text-right">{tx.amount.toFixed(2)} €</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
