import { Link } from "react-router-dom";
import {
  Download,
  PlayCircle,
  CreditCard,
  UserCircle,
  Clock,
  Video,
  Shield,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ContinueWatching from "./ContinueWatching";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <section className="dashboard-header mb-8">
        <div>
          <span className="eyebrow">DASHBOARD</span>
          <h1>Welcome, {user?.name || "User"} 👋</h1>
          <p>Manage your StreamHub account and pick up where you left off.</p>
        </div>

        <div className="flex gap-3">
          <Link to="/meetings/create" className="btn btn-secondary">
            <Video size={16} /> Instant Meeting
          </Link>
          <Link to="/videos" className="btn btn-primary">
            <PlayCircle size={16} /> Browse Videos
          </Link>
        </div>
      </section>

      {/* Continue Watching Section */}
      <section className="dashboard-section mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2>Continue Watching</h2>
          <Link to="/history" className="text-link text-sm">
            View full history →
          </Link>
        </div>
        <ContinueWatching />
      </section>

      {/* Dashboard Shortcut Cards */}
      <div className="dashboard-grid mb-10">
        <Link to="/videos" className="dashboard-card">
          <div className="dashboard-icon bg-purple-500/20 text-purple-400">
            <PlayCircle size={26} />
          </div>
          <h3>Browse Catalog</h3>
          <p>Explore high quality videos and curated tutorials.</p>
        </Link>

        <Link to="/subscription" className="dashboard-card">
          <div className="dashboard-icon bg-indigo-500/20 text-indigo-400">
            <CreditCard size={26} />
          </div>
          <h3>Subscription</h3>
          <p>Manage your {user?.membership || "Free"} plan and invoices.</p>
        </Link>

        <Link to="/downloads" className="dashboard-card">
          <div className="dashboard-icon bg-pink-500/20 text-pink-400">
            <Download size={26} />
          </div>
          <h3>Offline Downloads</h3>
          <p>Watch your saved videos without internet.</p>
        </Link>

        <Link to="/meetings" className="dashboard-card">
          <div className="dashboard-icon bg-blue-500/20 text-blue-400">
            <Video size={26} />
          </div>
          <h3>Video Meetings</h3>
          <p>Host or join high-definition WebRTC video calls.</p>
        </Link>
      </div>

      {/* Account Info Box */}
      <section className="dashboard-info">
        <h2>Account Profile</h2>

        <div className="info-row">
          <span>Name</span>
          <strong>{user?.name || "-"}</strong>
        </div>

        <div className="info-row">
          <span>Email Address</span>
          <strong>{user?.email || "-"}</strong>
        </div>

        <div className="info-row">
          <span>Membership Tier</span>
          <span className="tier-tag">{user?.membership || "Free"}</span>
        </div>

        {user?.role === "admin" && (
          <div className="info-row">
            <span>Privileges</span>
            <span className="profile-admin-badge">System Administrator</span>
          </div>
        )}
      </section>
    </div>
  );
}