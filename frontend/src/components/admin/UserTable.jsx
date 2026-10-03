import { Shield, User, Ban, CheckCircle } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function UserTable({ users = [], onUpdateRole, onUpdateStatus }) {
  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>
                <div className="flex items-center gap-2">
                  <div className="user-avatar-sm">
                    {u.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{u.name}</span>
                </div>
              </td>
              <td>{u.email}</td>
              <td>
                <span className={`role-badge role-${u.role}`}>{u.role}</span>
              </td>
              <td>
                <span className="tier-tag">{u.membership || "Free"}</span>
              </td>
              <td>
                <span className={`status-badge status-${u.status || "active"}`}>
                  {u.status || "active"}
                </span>
              </td>
              <td>{formatDate(u.createdAt)}</td>
              <td>
                <div className="flex items-center gap-1">
                  <button
                    className="btn btn-xs btn-ghost"
                    onClick={() =>
                      onUpdateRole(u._id, u.role === "admin" ? "user" : "admin")
                    }
                    title="Toggle admin role"
                  >
                    <Shield size={14} />
                  </button>

                  <button
                    className={`btn btn-xs btn-ghost ${
                      u.status === "banned" ? "text-green-400" : "text-red-400"
                    }`}
                    onClick={() =>
                      onUpdateStatus(
                        u._id,
                        u.status === "banned" ? "active" : "banned"
                      )
                    }
                    title={u.status === "banned" ? "Unban user" : "Ban user"}
                  >
                    {u.status === "banned" ? (
                      <CheckCircle size={14} />
                    ) : (
                      <Ban size={14} />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
