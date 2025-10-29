import React from 'react';

interface NavbarProps {
  activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
    const tabs = ["dashboard", "budgeting", "reports"];
    return (
        <nav className="w-full bg-blue-600 text-white py-3 shadow-md flex justify-center space-x-8 rounded">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`text-sm font-semibold transition duration-200 ${
            activeTab === tab
              ? "border-b-2 border-white"
              : "opacity-80 hover:opacity-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
    );
}