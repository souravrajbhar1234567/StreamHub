import { Clock } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function LoginHistory({ logs = [] }) {
  return (
    <div className="login-history-card">
      <h3>Recent Security Activity</h3>
      <div className="login-logs-list">
        {logs.length === 0 ? (
          <p className="text-muted text-sm">No recent activity logged.</p>
        ) : (
          logs.map((log) => (
            <div key={log._id} className="log-item">
              <Clock size={16} className="text-muted shrink-0" />
              <div className="log-details">
                <span className="log-action font-medium">{log.action}</span>
                <span className="text-xs text-muted">
                  {log.ipAddress} • {formatDate(log.createdAt)}
                </span>
              </div>
              <span className={`status-badge status-${log.status}`}>{log.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
