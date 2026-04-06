import { TrendingUp, TrendingDown } from 'lucide-react';
import './SummaryCard.css';

function fmt(value) {
  if (typeof value === 'number') {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return value;
}

export default function SummaryCard({ title, value, subtitle, trendPct, trendLabel, icon: Icon }) {
  const positive = trendPct >= 0;

  return (
    <div className="summary-card card">
      <div className="sc-top">
        <div className="sc-title-row">
          <span className="sc-title">{title}</span>
          {Icon && (
            <div className="sc-icon-wrap">
              <Icon size={18} strokeWidth={1.75} />
            </div>
          )}
        </div>
      </div>

      <div className="sc-value">{fmt(value)}</div>

      <div className="sc-bottom">
        <span className={positive ? 'trend-up' : 'trend-down'}>
          {positive
            ? <TrendingUp size={12} strokeWidth={2} />
            : <TrendingDown size={12} strokeWidth={2} />
          }
          {Math.abs(trendPct)}%
        </span>
        {subtitle && <span className="sc-subtitle">{subtitle}</span>}
      </div>
    </div>
  );
}
