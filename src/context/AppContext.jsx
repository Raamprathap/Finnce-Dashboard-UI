import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { transactionAPI } from "../api/transactions";

const AppContext = createContext(null);
const STORAGE_KEY = "finnce_v2";

function save(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {}
}

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("admin");
  const [theme, setTheme] = useState("light");

  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
    dateFrom: "",
    dateTo: "",
    sortBy: "date",
    sortDir: "desc",
  });

  // Fetch transactions from API on mount
  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true);
        setError(null);
        const data = await transactionAPI.getTransactions();
        setTransactions(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch transactions:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    save({ transactions, role, theme });
  }, [transactions, role, theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  function genId() {
    return Math.random().toString(36).substring(2, 10);
  }

  const addTransaction = useCallback(async (tx) => {
    try {
      const newTx = await transactionAPI.createTransaction(tx);
      setTransactions((p) =>
        [newTx, ...p].sort((a, b) => new Date(b.date) - new Date(a.date)),
      );
    } catch (err) {
      console.error("Failed to add transaction:", err);
      throw err;
    }
  }, []);

  const editTransaction = useCallback(async (id, updated) => {
    try {
      await transactionAPI.updateTransaction(id, updated);
      setTransactions((p) =>
        p
          .map((t) => (t.id === id ? { ...t, ...updated } : t))
          .sort((a, b) => new Date(b.date) - new Date(a.date)),
      );
    } catch (err) {
      console.error("Failed to edit transaction:", err);
      throw err;
    }
  }, []);

  const deleteTransaction = useCallback(async (id) => {
    try {
      await transactionAPI.deleteTransaction(id);
      setTransactions((p) => p.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Failed to delete transaction:", err);
      throw err;
    }
  }, []);

  const filteredTransactions = transactions
    .filter((t) => {
      const s = filters.search.toLowerCase();
      const matchSearch =
        !s ||
        t.description.toLowerCase().includes(s) ||
        t.category.toLowerCase().includes(s);
      const matchType = filters.type === "all" || t.type === filters.type;
      const matchCat =
        filters.category === "all" || t.category === filters.category;
      const matchFrom = !filters.dateFrom || t.date >= filters.dateFrom;
      const matchTo = !filters.dateTo || t.date <= filters.dateTo;
      return matchSearch && matchType && matchCat && matchFrom && matchTo;
    })
    .sort((a, b) => {
      const dir = filters.sortDir === "asc" ? 1 : -1;
      if (filters.sortBy === "date")
        return dir * (new Date(a.date) - new Date(b.date));
      if (filters.sortBy === "amount") return dir * (a.amount - b.amount);
      if (filters.sortBy === "description")
        return dir * a.description.localeCompare(b.description);
      return 0;
    });

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  return (
    <AppContext.Provider
      value={{
        transactions,
        filteredTransactions,
        filters,
        setFilters,
        role,
        setRole,
        theme,
        toggleTheme,
        addTransaction,
        editTransaction,
        deleteTransaction,
        totalIncome,
        totalExpense,
        totalBalance,
        genId,
        loading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
}
