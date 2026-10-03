import { UserCircle, Crown, Shield } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function ProfileHeader({ user }) {
  return (
    <div className="profile-header-card">
      <div className="profile-avatar-large">
        {user?.avatar ? (
          <img src={user.avatar} alt={user.name} />
        ) : (
          <UserCircle size={80} className="text-purple-400" />
        )}
      </div>

      <div className="profile-info-main">
        <div className="profile-name-row">
          <h2>{user?.name || "User"}</h2>
          <span className="profile-tier-badge">
            <Crown size={14} /> {user?.membership || "Free"}
          </span>
          {user?.role === "admin" && (
            <span className="profile-admin-badge">
              <Shield size={14} /> Admin
            </span>
          )}
        </div>
        <p className="profile-email">{user?.email}</p>
        {user?.bio && <p className="profile-bio">{user.bio}</p>}
        <span className="profile-joined text-xs text-muted">
          Member since {formatDate(user?.createdAt || new Date())}
        </span>
      </div>
    </div>
  );
}
