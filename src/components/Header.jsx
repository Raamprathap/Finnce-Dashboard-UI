import { Calendar, Download, Menu, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Header.css';

const PAGE_META = {
  dashboard:    { title: 'Overview' },
  transactions: { title: 'Transactions' },
  insights:     { title: 'Insights' },
};

const ROLES = [
  { value: 'admin',  label: 'Admin'  },
  { value: 'viewer', label: 'Viewer' },
];

export default function Header({ onMenuToggle }) {
  const { role, setRole, activePage, totalBalance } = useApp();
  const { title } = PAGE_META[activePage] ?? PAGE_META.dashboard;

  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric',
  });

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={onMenuToggle} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <div>
          <h1 className="header-page-title">{title}</h1>
        </div>
      </div>

      <div className="header-right">
        {/* <div className="header-date-chip">
          <Calendar size={14} strokeWidth={1.75} />
          <span>{today}</span>
        </div> */}
        
        <div className="header-role-wrap" id="header-role">
          <div className="role-select-wrap">
            <select
              id="role-dropdown"
              className="role-native-select"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              {ROLES.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            <div className="role-select-display">
              <span className={`role-dot ${role}`} />
              <span className="role-display-label">
                {ROLES.find(r => r.value === role)?.label}
              </span>
              <ChevronDown size={13} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
