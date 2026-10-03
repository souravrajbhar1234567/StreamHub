import { formatDate } from "../../utils/formatDate";

export default function AuditLogTable({ logs = [] }) {
  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Action</th>
            <th>User</th>
            <th>IP Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{formatDate(log.createdAt)}</td>
              <td>
                <span className="font-mono text-xs font-semibold">{log.action}</span>
              </td>
              <td>{log.user?.email || log.userEmail || "Anonymous"}</td>
              <td className="font-mono text-xs">{log.ipAddress}</td>
              <td>
                <span className={`status-badge status-${log.status}`}>
                  {log.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
