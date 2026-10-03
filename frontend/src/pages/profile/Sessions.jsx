import { useState, useEffect } from "react";
import ActiveSessions from "../../components/profile/ActiveSessions";
import { getSessions, revokeSession } from "../../services/authApi";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    getSessions()
      .then((res) => setSessions(res.data.sessions || []))
      .catch(() => {});
  }, []);

  const handleRevoke = async (id) => {
    await revokeSession(id);
    setSessions((prev) => prev.filter((s) => s._id !== id));
  };

  return (
    <div className="page-container">
      <div className="section-heading mb-6">
        <span className="eyebrow">DEVICES</span>
        <h1>Active Sessions</h1>
        <p>Review and terminate devices currently logged into your StreamHub account.</p>
      </div>

      <ActiveSessions sessions={sessions} onRevoke={handleRevoke} />
    </div>
  );
}
