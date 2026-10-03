import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlaySquare,
  Clock,
  Download,
  CreditCard,
  User,
  Shield,
  Video,
  Users,
  Flag,
  FileText,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ isAdmin = false }) {
  const { user } = useAuth();

  if (isAdmin) {
    return (
      <aside className="sidebar admin-sidebar">
        <div className="sidebar-section-title">ADMINISTRATION</div>
        <nav className="sidebar-nav">
          <NavLink to="/admin" end className="sidebar-link">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/users" className="sidebar-link">
            <Users size={18} />
            <span>Users</span>
          </NavLink>
          <NavLink to="/admin/videos" className="sidebar-link">
            <Video size={18} />
            <span>Videos</span>
          </NavLink>
          <NavLink to="/admin/subscriptions" className="sidebar-link">
            <CreditCard size={18} />
            <span>Subscriptions</span>
          </NavLink>
          <NavLink to="/admin/payments" className="sidebar-link">
            <CreditCard size={18} />
            <span>Payments</span>
          </NavLink>
          <NavLink to="/admin/reports" className="sidebar-link">
            <Flag size={18} />
            <span>Reports</span>
          </NavLink>
          <NavLink to="/admin/audit-logs" className="sidebar-link">
            <FileText size={18} />
            <span>Audit Logs</span>
          </NavLink>
        </nav>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-section-title">MENU</div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" end className="sidebar-link">
          <LayoutDashboard size={18} />
          <span>Overview</span>
        </NavLink>
        <NavLink to="/videos" className="sidebar-link">
          <PlaySquare size={18} />
          <span>Videos</span>
        </NavLink>
        <NavLink to="/history" className="sidebar-link">
          <Clock size={18} />
          <span>History</span>
        </NavLink>
        <NavLink to="/downloads" className="sidebar-link">
          <Download size={18} />
          <span>Downloads</span>
        </NavLink>
        <NavLink to="/subscription" className="sidebar-link">
          <CreditCard size={18} />
          <span>Subscription</span>
        </NavLink>
        <NavLink to="/profile" className="sidebar-link">
          <User size={18} />
          <span>Profile</span>
        </NavLink>
        {user?.role === "admin" && (
          <NavLink to="/admin" className="sidebar-link admin-highlight">
            <Shield size={18} />
            <span>Admin Panel</span>
          </NavLink>
        )}
      </nav>
    </aside>
  );
}
