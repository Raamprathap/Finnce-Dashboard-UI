import { useState, useRef, useEffect } from "react";
import {
  Plus,
  Search,
  Download,
  Pencil,
  Trash2,
  ArrowUpDown,
  SlidersHorizontal,
  X,
  RotateCcw,
  Check,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "../mockData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import "./Transactions.css";

const EMPTY_FILTERS = {
  type: "all",
  category: "all",
  dateFrom: "",
  dateTo: "",
};

function TransactionModal({ mode, initial, onClose, onSave }) {
  const [form, setForm] = useState(
    initial ?? {
      description: "",
      amount: "",
      category: "Salary",
      type: "income",
      date: new Date().toISOString().split("T")[0],
    },
  );
  const [errors, setErrors] = useState({});
  const cats = form.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  function set(key, val) {
    setForm((f) => {
      const next = { ...f, [key]: val };
      if (key === "type") {
        const list = val === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
        if (!list.includes(next.category)) next.category = list[0];
      }
      return next;
    });
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate() {
    const e = {};
    if (!form.description.trim()) e.description = "Required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = "Enter a valid amount";
    if (!form.date) e.date = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    onSave({ ...form, amount: parseFloat(form.amount) });
  }

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box">
        <div className="modal-header">
          <h2 className="modal-title">
            {mode === "add" ? "Add Transaction" : "Edit Transaction"}
          </h2>
          <button
            className="modal-close"
            onClick={onClose}
            id="modal-close-btn"
          >
            ✕
          </button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="type-toggle" role="group">
            <button
              type="button"
              id="type-income"
              className={`type-btn ${form.type === "income" ? "active income" : ""}`}
              onClick={() => set("type", "income")}
            >
              Income
            </button>
            <button
              type="button"
              id="type-expense"
              className={`type-btn ${form.type === "expense" ? "active expense" : ""}`}
              onClick={() => set("type", "expense")}
            >
              Expense
            </button>
          </div>

          <div className="input-group">
            <label>Description</label>
            <input
              id="tx-description"
              className={`input-field ${errors.description ? "error" : ""}`}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="e.g. Monthly Salary"
            />
            {errors.description && (
              <span className="field-error">{errors.description}</span>
            )}
          </div>

          <div className="form-row-2">
            <div className="input-group">
              <label>Amount (USD)</label>
              <input
                id="tx-amount"
                type="number"
                min="0.01"
                step="0.01"
                className={`input-field ${errors.amount ? "error" : ""}`}
                value={form.amount}
                onChange={(e) => set("amount", e.target.value)}
                placeholder="0.00"
              />
              {errors.amount && (
                <span className="field-error">{errors.amount}</span>
              )}
            </div>
            <div className="input-group">
              <label>Date</label>
              <input
                id="tx-date"
                type="date"
                className={`input-field ${errors.date ? "error" : ""}`}
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
              />
              {errors.date && (
                <span className="field-error">{errors.date}</span>
              )}
            </div>
          </div>

          <div className="input-group">
            <label>Category</label>
            <select
              id="tx-category"
              className="input-field"
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
            >
              {cats.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              id="tx-submit-btn"
              className="btn btn-primary"
            >
              {mode === "add" ? "Add Transaction" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FiltersPopup({
  filters,
  setFilters,
  uniqueCats,
  onClose,
  open,
  setOpen,
}) {
  const [draft, setDraft] = useState({ ...filters });

  function d(key, val) {
    setDraft((prev) => ({ ...prev, [key]: val }));
  }

  function handleApply() {
    setFilters((f) => ({ ...f, ...draft }));
    setOpen(false);
  }

  function handleReset() {
    setDraft((prev) => ({ ...prev, ...EMPTY_FILTERS }));
    setFilters((f) => ({ ...f, ...EMPTY_FILTERS }));
    setOpen(false);
  }

  const activeCount = [
    draft.type !== "all",
    draft.category !== "all",
    !!draft.dateFrom,
    !!draft.dateTo,
  ].filter(Boolean).length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={`btn btn-ghost btn-sm filter-toggle-btn ${activeCount > 0 ? "has-filters" : ""}`}
        id="open-filters-btn"
      >
        <SlidersHorizontal size={14} />
        Filters
        {activeCount > 0 && (
          <span className="filter-count-badge">{activeCount}</span>
        )}
      </PopoverTrigger>
      <PopoverContent
        className="filter-popup p-0 w-auto"
        align="end"
        side="bottom"
        sideOffset={8}
      >
        <div className="filter-popup-header">
          <div className="filter-popup-title-row">
            <SlidersHorizontal size={15} />
            <span>Filters</span>
            {activeCount > 0 && (
              <span className="filter-count-badge">{activeCount}</span>
            )}
          </div>
        </div>

        <div className="filter-popup-body">
          <div className="input-group">
            <label>Type</label>
            <div className="filter-type-row">
              {["all", "income", "expense"].map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`filter-chip ${draft.type === t ? "active" : ""} ${t !== "all" ? t : ""}`}
                  onClick={() => d("type", t)}
                >
                  {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>Category</label>
            <select
              id="filter-category"
              className="input-field"
              value={draft.category}
              onChange={(e) => d("category", e.target.value)}
            >
              <option value="all">All Categories</option>
              {uniqueCats.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-date-row">
            <div className="input-group">
              <label>From</label>
              <input
                type="date"
                id="filter-from"
                className="input-field"
                value={draft.dateFrom}
                onChange={(e) => d("dateFrom", e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>To</label>
              <input
                type="date"
                id="filter-to"
                className="input-field"
                value={draft.dateTo}
                onChange={(e) => d("dateTo", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="filter-popup-footer">
          <button
            className="btn btn-ghost btn-sm"
            id="filter-reset-btn"
            onClick={handleReset}
          >
            <RotateCcw size={13} /> Reset
          </button>
          <button
            className="btn btn-primary btn-sm"
            id="filter-apply-btn"
            onClick={handleApply}
          >
            <Check size={13} /> Apply
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function Transactions() {
  const {
    filteredTransactions,
    filters,
    setFilters,
    addTransaction,
    editTransaction,
    deleteTransaction,
    role,
    genId,
  } = useApp();

  const [modal, setModal] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const isAdmin = role === "admin";

  const activeFilterCount = [
    filters.type !== "all",
    filters.category !== "all",
    !!filters.dateFrom,
    !!filters.dateTo,
  ].filter(Boolean).length;

  function handleSave(data) {
    if (modal.mode === "add") addTransaction({ ...data, id: genId() });
    else editTransaction(modal.tx.id, data);
    setModal(null);
  }

  function toggleSort(field) {
    setFilters((f) => ({
      ...f,
      sortBy: field,
      sortDir: f.sortBy === field && f.sortDir === "desc" ? "asc" : "desc",
    }));
  }

  function exportCSV() {
    const header = "Date,Description,Category,Type,Amount";
    const rows = filteredTransactions.map(
      (t) => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`,
    );
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const uniqueCats = [
    ...new Set(filteredTransactions.map((t) => t.category)),
  ].sort();

  return (
    <div className="page-container">
      <div className="tx-page-header animate-in">
        <div>
          <h1 className="tx-page-title">Transactions</h1>
          <p className="tx-page-sub">
            {filteredTransactions.length} records found
          </p>
        </div>
        <div className="tx-header-actions">
          <button
            className="btn btn-ghost btn-sm"
            id="export-csv-btn"
            onClick={exportCSV}
          >
            <Download size={14} /> Export CSV
          </button>
          {isAdmin && (
            <button
              className="btn btn-primary"
              id="add-transaction-btn"
              onClick={() => setModal({ mode: "add" })}
            >
              <Plus size={15} /> Add Transaction
            </button>
          )}
        </div>
      </div>

      <div className="tx-toolbar animate-in delay-1">
        <div className="filter-search">
          <Search size={15} className="search-icon" />
          <input
            id="tx-search"
            className="search-input"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) =>
              setFilters((f) => ({ ...f, search: e.target.value }))
            }
          />
        </div>

        <FiltersPopup
          filters={filters}
          setFilters={setFilters}
          uniqueCats={uniqueCats}
          open={showFilters}
          setOpen={setShowFilters}
        />
      </div>

      <div className="card tx-table-card animate-in delay-2">
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Search size={22} />
            </div>
            <h3>No transactions found</h3>
            <p>Try adjusting your filters or add a new transaction.</p>
          </div>
        ) : (
          <div className="tx-table-wrap">
            <table className="tx-table">
              <thead>
                <tr>
                  <th className="sortable" onClick={() => toggleSort("date")}>
                    Date <ArrowUpDown size={12} />
                  </th>
                  <th
                    className="sortable"
                    onClick={() => toggleSort("description")}
                  >
                    Description <ArrowUpDown size={12} />
                  </th>
                  <th>Category</th>
                  <th>Type</th>
                  <th
                    className="sortable"
                    onClick={() => toggleSort("amount")}
                  >
                    Amount <ArrowUpDown size={12} />
                  </th>
                  {isAdmin && <th className="text-right">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((t) => (
                  <tr key={t.id} className="tx-row">
                    <td className="tx-date">
                      {new Date(t.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="tx-desc">{t.description}</td>
                    <td>
                      <span className="tx-cat">{t.category}</span>
                    </td>
                    <td>
                      <span className={`badge badge-${t.type}`}>{t.type}</span>
                    </td>
                    <td className={`tx-amt ${t.type}`}>
                      {t.type === "income" ? "+" : "-"}$
                      {t.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    {isAdmin && (
                      <td className="tx-actions text-right">
                        <button
                          id={`edit-${t.id}`}
                          className="action-btn edit"
                          onClick={() =>
                            setModal({
                              mode: "edit",
                              tx: { ...t, amount: String(t.amount) },
                            })
                          }
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          id={`delete-${t.id}`}
                          className="action-btn delete"
                          onClick={() => setDeleteId(t.id)}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <TransactionModal
          mode={modal.mode}
          initial={modal.tx}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {deleteId && (
        <div
          className="modal-backdrop"
          onClick={(e) => e.target === e.currentTarget && setDeleteId(null)}
        >
          <div
            className="modal-box"
            style={{ maxWidth: 380, textAlign: "center" }}
          >
            <div className="delete-confirm-icon">
              <Trash2 size={28} />
            </div>
            <h2 className="modal-title" style={{ marginBottom: 8 }}>
              Delete Transaction?
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 14,
                marginBottom: 24,
              }}
            >
              This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="btn btn-ghost"
                style={{ flex: 1, justifyContent: "center" }}
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                id="confirm-delete-btn"
                className="btn btn-danger"
                style={{ flex: 1, justifyContent: "center" }}
                onClick={() => {
                  deleteTransaction(deleteId);
                  setDeleteId(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
