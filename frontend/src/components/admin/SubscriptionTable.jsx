import { formatDate } from "../../utils/formatDate";

export default function SubscriptionTable({ subscriptions = [] }) {
  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Auto-Renew</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((s) => (
            <tr key={s._id}>
              <td>{s.user?.name || "User"}</td>
              <td>{s.user?.email || "-"}</td>
              <td>
                <span className="tier-tag">{s.planName}</span>
              </td>
              <td>
                <span className={`status-badge status-${s.status}`}>
                  {s.status}
                </span>
              </td>
              <td>{formatDate(s.startDate)}</td>
              <td>{formatDate(s.endDate)}</td>
              <td>{s.autoRenew ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
