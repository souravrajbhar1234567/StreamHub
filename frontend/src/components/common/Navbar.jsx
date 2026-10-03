import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  LogOut,
  UserCircle,
  PlaySquare,
  Shield,
  Video as VideoIcon,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          <span className="brand-icon">
            <PlaySquare size={20} />
          </span>
          Stream<span>Hub</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/videos">Videos</NavLink>
          <NavLink to="/plans">Plans</NavLink>
          <NavLink to="/meetings">Meetings</NavLink>
          {user && <NavLink to="/dashboard">Dashboard</NavLink>}
          {user?.role === "admin" && (
            <NavLink to="/admin" className="admin-nav-link">
              <Shield size={14} /> Admin
            </NavLink>
          )}
        </nav>
      </div>

      <div className="nav-actions">
        <Link to="/videos" className="icon-btn" title="Search videos">
          <Search size={18} />
        </Link>

        <ThemeToggle />

        {user ? (
          <div className="user-nav-group">
            <Link to="/profile" className="user-chip">
              <UserCircle size={18} />
              <span>{user.name}</span>
              <span className="tier-tag">{user.membership || "Free"}</span>
            </Link>

            <button
              className="icon-btn logout-btn"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <div className="auth-btns">
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
