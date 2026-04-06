import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar,
} from 'recharts';
import { useApp } from '../context/AppContext';
import './Charts.css';

function getWeekKey(dateStr) {
  const d = new Date(dateStr);
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() - day + 1);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

function formatWeekLabel(weekKey) {
  const d = new Date(weekKey);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

function buildCashflowData(transactions) {
  const weekly = {};
  transactions.forEach(t => {
    const key = getWeekKey(t.date);
    if (!weekly[key]) weekly[key] = { income: 0, expense: 0 };
    if (t.type === 'income') weekly[key].income += t.amount;
    else weekly[key].expense += t.amount;
  });
  return Object.entries(weekly)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => ({
      month: formatWeekLabel(k),
      Income: Math.round(v.income),
      Expense: Math.round(v.expense),
    }));
}

function buildDonutData(transactions) {
  const cats = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    cats[t.category] = (cats[t.category] || 0) + t.amount;
  });
  return Object.entries(cats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([name, value]) => ({ name, value: Math.round(value) }));
}

/* ─── Custom Tooltip ─── */
function CashflowTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="ct-label">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="ct-row">
          <span className="ct-dot" style={{ background: p.color }} />
          <span className="ct-name">{p.name}</span>
          <span className="ct-val">${p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

const DONUT_COLORS = ['#3B82F6', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#06B6D4'];

/* ─── Cashflow Chart ─── */
export function CashflowChart() {
  const { transactions, totalBalance } = useApp();
  const data = buildCashflowData(transactions);

  return (
    <div className="chart-card card">
      <div className="chart-header">
        <div>
          <p className="chart-sub-label">Total Balance</p>
          <div className="chart-title-row">
            <h2 className="chart-big-value">
              {totalBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}
            </h2>
          </div>
        </div>
        <div className="chart-legend">
          <span className="legend-item">
            <span className="legend-dot" style={{ background: '#EF4444' }} />
            Expense
          </span>
          <span className="legend-item">
            <span className="legend-dot" style={{ background: '#F59E0B' }} />
            Income
          </span>
        </div>
      </div>

      <p className="chart-section-title">Cashflow</p>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 10, right: 4, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.18} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.18} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CashflowTooltip />} />
          <Area
            type="monotone"
            dataKey="Income"
            stroke="#F59E0B"
            strokeWidth={2.5}
            fill="url(#gradIncome)"
            dot={{ fill: '#F59E0B', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
          <Area
            type="monotone"
            dataKey="Expense"
            stroke="#EF4444"
            strokeWidth={2.5}
            fill="url(#gradExpense)"
            dot={{ fill: '#EF4444', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─── Spending Donut Chart ─── */
function DonutLabel({ cx, cy, value }) {
  return (
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
      <tspan x={cx} dy="-0.3em" style={{ fontSize: 18, fontWeight: 700, fill: 'var(--text-primary)' }}>
        ${(value / 1000).toFixed(1)}k
      </tspan>
      <tspan x={cx} dy="1.6em" style={{ fontSize: 11, fill: 'var(--text-secondary)' }}>
        Total
      </tspan>
    </text>
  );
}

export function SpendingDonut() {
  const { transactions } = useApp();
  const data = buildDonutData(transactions);
  const total = data.reduce((s, d) => s + d.value, 0);

  if (data.length === 0) {
    return (
      <div className="chart-card card">
        <div className="empty-state">
          <div className="empty-state-icon"><span>-</span></div>
          <h3>No expense data</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-card card">
      <div className="chart-header">
        <h2 className="chart-section-title" style={{ marginBottom: 0 }}>Spending Breakdown</h2>
      </div>

      <div className="donut-layout">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={3}
              cornerRadius={3}
              dataKey="value"
              labelLine={false}
              label={<DonutLabel cx={0} cy={0} value={total} />}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              formatter={(val) => [`$${val.toLocaleString()}`, '']}
              contentStyle={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                fontSize: 13,
                color: 'var(--text-primary)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="donut-legend">
          {data.map((d, i) => {
            const pct = Math.round((d.value / total) * 100);
            return (
              <div key={d.name} className="donut-legend-row">
                <span className="donut-legend-dot" style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }} />
                <span className="donut-legend-name">{d.name}</span>
                <span className="donut-legend-pct">{pct}%</span>
                <span className="donut-legend-val">${d.value.toLocaleString()}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Monthly Bar Chart (for Insights) ─── */
const MONTHS_MAP = { '2024-11': 'Nov', '2024-12': 'Dec', '2025-01': 'Jan' };

export function MonthlyBarChart() {
  const { transactions } = useApp();

  const monthly = {};
  transactions.forEach(t => {
    const [y, m] = t.date.split('-');
    const key = `${y}-${m}`;
    if (!monthly[key]) monthly[key] = { income: 0, expense: 0 };
    if (t.type === 'income') monthly[key].income += t.amount;
    else monthly[key].expense += t.amount;
  });

  const data = Object.entries(monthly)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => ({
      month: MONTHS_MAP[k] || k,
      Income: Math.round(v.income),
      Expense: Math.round(v.expense),
      Savings: Math.round(v.income - v.expense),
    }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 4, left: -10, bottom: 0 }} barGap={6}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
        <Tooltip
          contentStyle={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            fontSize: 13,
            color: 'var(--text-primary)',
          }}
          formatter={v => `$${v.toLocaleString()}`}
          cursor={{ fill: 'rgba(59,130,246,0.05)' }}
        />
        <Bar dataKey="Income"  fill="#F59E0B" radius={[5, 5, 0, 0]} maxBarSize={36} />
        <Bar dataKey="Expense" fill="#EF4444" radius={[5, 5, 0, 0]} maxBarSize={36} />
        <Bar dataKey="Savings" fill="#3B82F6" radius={[5, 5, 0, 0]} maxBarSize={36} />
      </BarChart>
    </ResponsiveContainer>
  );
}
