import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileForm from "../../components/profile/ProfileForm";
import AccountSettings from "../../components/profile/AccountSettings";
import SecurityPanel from "../../components/profile/SecurityPanel";
import ActiveSessions from "../../components/profile/ActiveSessions";
import { getSessions, revokeSession, updateProfile } from "../../services/authApi";

export default function Profile() {
  const { user, loadUser } = useAuth();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    getSessions()
      .then((res) => setSessions(res.data.sessions || []))
      .catch(() => {});
  }, []);

  const handleRevokeSession = async (sessionId) => {
    try {
      await revokeSession(sessionId);
      setSessions((prev) => prev.filter((s) => s._id !== sessionId));
    } catch (err) {
      alert("Failed to revoke session.");
    }
  };

  const handleToggle2FA = async () => {
    const nextState = !user?.twoFactorEnabled;
    try {
      await updateProfile({ twoFactorEnabled: nextState });
      if (loadUser) loadUser();
    } catch (err) {
      alert("Failed to update 2FA status.");
    }
  };

  return (
    <div className="page-container">
      <div className="section-heading mb-6">
        <span className="eyebrow">SETTINGS</span>
        <h1>My Account</h1>
        <p>Manage your profile info, security settings, and active login sessions.</p>
      </div>

      <ProfileHeader user={user} />

      <div className="profile-two-col-grid mt-8">
        <div className="profile-left-col flex flex-col gap-6">
          <ProfileForm user={user} onProfileUpdated={loadUser} />
          <AccountSettings />
        </div>

        <div className="profile-right-col flex flex-col gap-6">
          <SecurityPanel user={user} onToggle2FA={handleToggle2FA} />
          <ActiveSessions sessions={sessions} onRevoke={handleRevokeSession} />
        </div>
      </div>
    </div>
  );
}