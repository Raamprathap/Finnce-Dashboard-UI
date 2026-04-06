import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import SummaryCard from "../components/SummaryCard";
import { CashflowChart, SpendingDonut } from "../components/Charts";
import "./Dashboard.css";

function fmt(n) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

function pct(curr, prev) {
  if (!prev) return 0;
  return Math.round(((curr - prev) / prev) * 100);
}

export default function Dashboard() {
  const { transactions, totalBalance, totalIncome, totalExpense } = useApp();

  const recent = transactions.slice(0, 7);

  const currIncome = transactions
    .filter((t) => t.type === "income" && t.date.startsWith("2025-01"))
    .reduce((s, t) => s + t.amount, 0);
  const prevIncome = transactions
    .filter((t) => t.type === "income" && t.date.startsWith("2024-12"))
    .reduce((s, t) => s + t.amount, 0);
  const currExpense = transactions
    .filter((t) => t.type === "expense" && t.date.startsWith("2025-01"))
    .reduce((s, t) => s + t.amount, 0);
  const prevExpense = transactions
    .filter((t) => t.type === "expense" && t.date.startsWith("2024-12"))
    .reduce((s, t) => s + t.amount, 0);

  const balancePct = pct(currIncome - currExpense, prevIncome - prevExpense);

  return (
    <div className="page-container">
      <div className="dash-welcome animate-in">
        <h2 className="dash-welcome-text">Welcome back, Raam</h2>
        <p className="dash-welcome-sub">
          Your Zorvyn financial overview for today.
        </p>
      </div>

      <div className="dash-cards animate-in delay-1">
        <SummaryCard
          title="Total Balance"
          value={totalBalance}
          trendPct={balancePct}
          subtitle="Compared to last month"
          icon={Wallet}
        />
        <SummaryCard
          title="Total Income"
          value={totalIncome}
          trendPct={pct(currIncome, prevIncome)}
          subtitle="Compared to last month"
          icon={TrendingUp}
        />
        <SummaryCard
          title="Total Expenses"
          value={totalExpense}
          trendPct={-pct(currExpense, prevExpense)}
          subtitle="Compared to last month"
          icon={TrendingDown}
        />
      </div>

      <div className="dash-charts animate-in delay-2">
        <div className="dash-chart-main">
          <CashflowChart />
        </div>
        <div className="dash-chart-side">
          <SpendingDonut />
        </div>
      </div>

      <div className="card dash-recent animate-in delay-3">
        <div className="section-header">
          <h2>Recent Activity</h2>
          <Link
            to="/transactions"
            className="btn btn-ghost btn-sm"
            id="view-all-btn"
          >
            View all
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <span>—</span>
            </div>
            <h3>No transactions yet</h3>
            <p>Add a transaction to get started.</p>
          </div>
        ) : (
          <table className="recent-table">
            <thead>
              <tr>
                <th>Description</th>
                <th className="hidden md:table-cell">Category</th>
                <th className="hidden md:table-cell">Date</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((t) => (
                <tr key={t.id}>
                  <td className="rt-desc">{t.description}</td>
                  <td className="hidden md:table-cell">
                    <span className="rt-cat">{t.category}</span>
                  </td>
                  <td className="rt-date">
                    {new Date(t.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className={`rt-amount text-right ${t.type}`}>
                    {t.type === "income" ? "+" : "-"}
                    {fmt(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
