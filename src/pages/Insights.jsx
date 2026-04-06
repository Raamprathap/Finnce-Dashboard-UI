import { Trophy, PiggyBank, TrendingUp, BarChart3 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MonthlyBarChart } from '../components/Charts';
import './Insights.css';

const MONTHS_MAP = {
  '2024-08': 'August', '2024-09': 'September', '2024-10': 'October',
  '2024-11': 'November', '2024-12': 'December', '2025-01': 'January',
};
const MONTH_KEYS = ['2024-08', '2024-09', '2024-10', '2024-11', '2024-12', '2025-01'];
const BAR_COLORS = ['#3B82F6', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#06B6D4'];

export default function Insights() {
  const { transactions } = useApp();

  const totalIncome  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  const byCategory = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
  });
  const sortedCats = Object.entries(byCategory).sort(([, a], [, b]) => b - a);
  const topCategory = sortedCats[0];

  const monthlyData = MONTH_KEYS.map(key => {
    const inc = transactions.filter(t => t.type === 'income'  && t.date.startsWith(key)).reduce((s, t) => s + t.amount, 0);
    const exp = transactions.filter(t => t.type === 'expense' && t.date.startsWith(key)).reduce((s, t) => s + t.amount, 0);
    return { label: MONTHS_MAP[key], income: Math.round(inc), expense: Math.round(exp), savings: Math.round(inc - exp) };
  });

  const bestMonth = [...monthlyData].sort((a, b) => b.savings - a.savings)[0];
  const avgSpend  = Math.round(totalExpense / MONTH_KEYS.length);
  const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100) : 0;

  const byIncome = {};
  transactions.filter(t => t.type === 'income').forEach(t => {
    byIncome[t.category] = (byIncome[t.category] || 0) + t.amount;
  });
  const sortedIncome = Object.entries(byIncome).sort(([, a], [, b]) => b - a);

  return (
    <div className="page-container">
      <div className="animate-in">
        <h1 className="ins-page-title">Insights</h1>
        <p className="ins-page-sub">Financial insights from your transaction history.</p>
      </div>

      <div className="card ins-chart-card animate-in delay-2">
        <div className="section-header">
          <h2>Monthly Comparison</h2>
          <div className="chart-legend-row">
            {[['#F59E0B', 'Income'], ['#EF4444', 'Expense'], ['#3B82F6', 'Savings']].map(([c, l]) => (
              <span key={l} className="legend-item">
                <span className="legend-dot" style={{ background: c }} />
                {l}
              </span>
            ))}
          </div>
        </div>
        <MonthlyBarChart />
      </div>

      <div className="ins-bottom-grid animate-in delay-3">
        <div className="card ins-panel">
          <div className="section-header">
            <h2>Spending by Category</h2>
          </div>
          {sortedCats.length === 0 ? (
            <div className="empty-state"><h3>No data</h3></div>
          ) : (
            <div className="cat-list">
              {sortedCats.slice(0, 8).map(([cat, amt], i) => {
                const pct = Math.round((amt / (totalExpense || 1)) * 100);
                return (
                  <div key={cat} className="cat-row">
                    <div className="cat-row-top">
                      <span className="cat-name">{cat}</span>
                      <span className="cat-amount">
                        ${amt.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        <span className="cat-pct"> · {pct}%</span>
                      </span>
                    </div>
                    <div className="cat-bar-bg">
                      <div
                        className="cat-bar-fill"
                        style={{ width: `${pct}%`, background: BAR_COLORS[i % BAR_COLORS.length] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="card ins-panel">
          <div className="section-header">
            <h2>Income Sources</h2>
          </div>
          {sortedIncome.length === 0 ? (
            <div className="empty-state"><h3>No income data</h3></div>
          ) : (
            <>
              <div className="income-source-list">
                {sortedIncome.map(([cat, amt], i) => {
                  const pct = Math.round((amt / (totalIncome || 1)) * 100);
                  return (
                    <div key={cat} className="income-row">
                      <div className="income-row-top">
                        <span className="cat-name">{cat}</span>
                        <span className="income-amt">${amt.toLocaleString('en-US', { minimumFractionDigits: 0 })}</span>
                      </div>
                      <div className="cat-bar-bg">
                        <div
                          className="cat-bar-fill"
                          style={{ width: `${pct}%`, background: BAR_COLORS[i % BAR_COLORS.length] }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="divider" />

              <div className="savings-section">
                <h3 className="savings-title">Monthly Savings Rate</h3>
                {monthlyData.map(({ label, income, savings }) => {
                  const rate = income > 0 ? Math.round((savings / income) * 100) : 0;
                  return (
                    <div key={label} className="savings-row">
                      <span className="savings-month">{label.slice(0, 3)}</span>
                      <div className="cat-bar-bg">
                        <div
                          className="cat-bar-fill"
                          style={{
                            width: `${Math.max(0, rate)}%`,
                            background: rate >= 0 ? '#10B981' : '#EF4444',
                          }}
                        />
                      </div>
                      <span
                        className="savings-rate-val"
                        style={{ color: rate >= 0 ? 'var(--success-text)' : 'var(--danger-text)' }}
                      >
                        {rate}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
