# Personal Finance Tracker

Ein **Personal Finance Tracker** gebaut mit **React**, **TypeScript**, **TailwindCSS** und **Framer Motion**.  
Er ermöglicht das **Verwalten von Transaktionen**, **Kategorien**, **Budgets** und **Auswertungen**, mit **lokaler Speicherung im Browser (LocalStorage)**.
Vorschau bei https://personal-finance-tracker-010.netlify.app/.

---

## Setup & Installation

### Voraussetzungen
- Node.js (≥ 18)
- npm oder pnpm

### Installation
```bash
# Repository klonen
git clone <REPO_URL>
cd personal-finance-tracker

# Abhängigkeiten installieren
npm install
```

### Entwicklung starten
```bash
npm run dev
```

Anschließend [http://localhost:5173](http://localhost:5173) öffnen.

---

## Architektur-Kurzbeschreibung

Die App ist modular aufgebaut und in **mehrere React-Komponenten** unterteilt:

| Modul / Komponente | Beschreibung |
|--------------------|--------------|
| `App.tsx` | Zentrale Steuerung der Tabs (Dashboard, Budgeting, Reports). Speichert globalen State und verwaltet LocalStorage. |
| `Navbar.tsx` | Navigationsleiste mit smoothen Übergängen zwischen Tabs. |
| `TransactionForm.tsx` | Formular zum Erfassen neuer Transaktionen. |
| `TransactionList.tsx` | Tabelle mit allen Transaktionen, inklusive Filtermöglichkeiten. |
| `CategoryManager.tsx` | CRUD-System zur Verwaltung der Kategorien. |
| `Budgeting.tsx` | Übersicht über gesetzte Budgets mit Fortschrittsanzeige und Warnung bei Überschreitung. |
| `Reports.tsx` | Darstellung von Auswertungen (Monatsübersicht, Kategorie-Breakdown, Verlauf). |
| `localStorage`-Integration | Alle Daten (Transaktionen, Kategorien, Budgets) werden im Browser persistent gespeichert. |

---

## Datenmodell

### Transaktion
```ts
interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  date: string;
  category: string;
  account: string;
  tag: string;
}
```

---

## Persistenz

Die Anwendung verwendet **LocalStorage** zur Datenspeicherung:

### Lade- & Speicherlogik
Beim Laden der App:
- Die Daten werden aus `localStorage` gelesen und in den React-State geladen.

Bei jeder Änderung (z. B. neue Transaktion, Kategorie, Budget):
- Der aktuelle Zustand wird automatisch wieder in `localStorage` geschrieben.

Dadurch bleiben Daten auch nach einem Neuladen oder Neustart des Browsers erhalten.
