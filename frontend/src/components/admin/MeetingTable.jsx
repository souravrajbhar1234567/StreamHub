import { formatDate } from "../../utils/formatDate";

export default function MeetingTable({ meetings = [] }) {
  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Room ID</th>
            <th>Title</th>
            <th>Host</th>
            <th>Status</th>
            <th>Started At</th>
            <th>Ended At</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((m) => (
            <tr key={m._id}>
              <td className="font-mono text-purple-400 font-medium">{m.roomId}</td>
              <td>{m.title}</td>
              <td>{m.host?.name || m.hostName || "Host"}</td>
              <td>
                <span className={`status-badge status-${m.status}`}>{m.status}</span>
              </td>
              <td>{formatDate(m.startedAt)}</td>
              <td>{m.endedAt ? formatDate(m.endedAt) : "Ongoing"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
