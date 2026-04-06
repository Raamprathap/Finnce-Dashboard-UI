import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart2,
  Moon,
  Sun,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "./Sidebar.css";

const NAV_ITEMS = [
  { path: "/", label: "Overview", Icon: LayoutDashboard },
  { path: "/transactions", label: "Transactions", Icon: ArrowLeftRight },
  { path: "/insights", label: "Insights", Icon: BarChart2 },
];

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const { theme, toggleTheme } = useApp();

  return (
    <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
      <div className="sidebar-logo">
        <div className="logo-mark">
          <img src="/logo.png" alt="Zorvyn" className="logo-img" />
        </div>
        <span className="logo-name">Zorvyn</span>
      </div>

      <div className="sidebar-section-label">Menu</div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ path, label, Icon }) => (
          <NavLink
            key={path}
            to={path}
            onClick={onMobileClose}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            id={`nav-${label.toLowerCase()}`}
          >
            {({ isActive }) => (
              <>
                <Icon size={18} strokeWidth={1.75} />
                <span className="nav-label">{label}</span>
                {isActive && <ChevronRight size={14} className="nav-chevron" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="dark-mode-toggle" id="dark-mode-toggle">
          <div className="dmt-left">
            {theme === "dark" ? (
              <Moon size={16} strokeWidth={1.75} />
            ) : (
              <Sun size={16} strokeWidth={1.75} />
            )}
            <span className="dmt-label">Dark Mode</span>
          </div>
          <button
            className={`toggle-switch ${theme === "dark" ? "on" : ""}`}
            onClick={toggleTheme}
            id="theme-toggle-btn"
            aria-label="Toggle dark mode"
          >
            <span className="toggle-knob" />
          </button>
        </div>
      </div>
    </aside>
  );
}
