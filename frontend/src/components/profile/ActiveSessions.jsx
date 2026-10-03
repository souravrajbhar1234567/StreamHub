import { Laptop, Smartphone, Trash2 } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function ActiveSessions({ sessions = [], onRevoke }) {
  return (
    <div className="active-sessions-card">
      <h3>Active Login Sessions</h3>
      <div className="sessions-list">
        {sessions.length === 0 ? (
          <p className="text-muted text-sm">No active sessions tracked.</p>
        ) : (
          sessions.map((s) => (
            <div key={s._id} className="session-item">
              <div className="session-device-icon">
                {s.deviceType === "mobile" ? (
                  <Smartphone size={22} />
                ) : (
                  <Laptop size={22} />
                )}
              </div>
              <div className="session-details">
                <strong>{s.browser} on {s.os}</strong>
                <p className="text-xs text-muted">
                  IP: {s.ipAddress} • Active since {formatDate(s.createdAt)}
                </p>
              </div>
              <button
                className="btn btn-sm btn-ghost text-red-400"
                onClick={() => onRevoke(s._id)}
                title="Revoke session"
              >
                <Trash2 size={15} /> Revoke
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
