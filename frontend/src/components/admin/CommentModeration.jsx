import { Trash2, CheckCircle } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function CommentModeration({ reports = [], onResolve }) {
  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Reported Comment</th>
            <th>Reported By</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-6 text-muted">
                No active moderation flags. The community is clean!
              </td>
            </tr>
          ) : (
            reports.map((r) => (
              <tr key={r._id}>
                <td className="max-w-xs truncate">
                  {r.comment?.text || "[Deleted/Hidden Comment]"}
                </td>
                <td>{r.reporter?.name || "User"}</td>
                <td>
                  <span className="reason-badge">{r.reason}</span>
                </td>
                <td>
                  <span className={`status-badge status-${r.status}`}>
                    {r.status}
                  </span>
                </td>
                <td>{formatDate(r.createdAt)}</td>
                <td>
                  {r.status === "pending" && (
                    <div className="flex items-center gap-1">
                      <button
                        className="btn btn-xs btn-danger"
                        onClick={() => onResolve(r._id, "delete")}
                        title="Delete comment and resolve"
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                      <button
                        className="btn btn-xs btn-ghost text-green-400"
                        onClick={() => onResolve(r._id, "dismiss")}
                        title="Dismiss report"
                      >
                        <CheckCircle size={13} /> Dismiss
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
