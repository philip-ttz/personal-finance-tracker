import React, { useState } from 'react';

interface CategoryManagerProps {
  categories: string[];
  addCategory: (category: string) => void;
    removeCategory: (category: string) => void;
    updateCategory: (oldCategory: string, newCategory: string) => void;
}

export function CategoryManager({ categories, addCategory, removeCategory, updateCategory }: CategoryManagerProps) {
    const [newCat, setNewCat] = useState<string>('');
    const [editing, setEditing] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<string>('');

    return (
        <div className="bg-white p-4 rounded shadow space-y-2">
      <h2 className="font-semibold text-slate-700">Category Management</h2>

      <div className="flex gap-2 w-full">
        <input type="text" value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="New Category" className="border px-2 py-1 rounded flex-1 min-w-0" />
        <button onClick={() => { if(newCat.trim()){ addCategory(newCat.trim()); setNewCat(""); }}} className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-2 py-1 rounded shrink-0">Add</button>
      </div>

      <ul className="space-y-1">
        {categories.map(cat => (
          <li key={cat} className="flex items-center gap-2 w-full">
            {editing === cat ? (
              <>
                <input type="text" value={editValue} onChange={e => setEditValue(e.target.value)} className="border px-2 py-1 rounded flex-1 min-w-0" />
                <button onClick={() => { if(editValue.trim()){ updateCategory(cat, editValue.trim()); setEditing(null); }}} className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-2 py-1 rounded shrink-0">Save</button>
                <button onClick={() => setEditing(null)} className="bg-gray-300 hover:bg-gray-400 active:bg-gray-500 px-2 py-1 rounded shrink-0">Cancel</button>
              </>
            ) : (
              <>
                <span className="flex-1 truncate text-slate-700" title={cat}>{cat}</span>
                <button onClick={() => { setEditing(cat); setEditValue(cat); }} className="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 px-2 py-1 rounded shrink-0">Edit</button>
                <button onClick={() => removeCategory(cat)} className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-2 py-1 rounded shrink-0">Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}