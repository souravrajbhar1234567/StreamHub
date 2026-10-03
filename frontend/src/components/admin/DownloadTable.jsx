import { formatDate } from "../../utils/formatDate";
import { formatFileSize } from "../../utils/formatFileSize";

export default function DownloadTable({ downloads = [] }) {
  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Video Title</th>
            <th>Quality</th>
            <th>File Size</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {downloads.map((d) => (
            <tr key={d._id}>
              <td>{d.user?.name || "User"}</td>
              <td>{d.videoTitle || d.video?.title || "Video"}</td>
              <td>
                <span className="quality-tag">{d.quality}</span>
              </td>
              <td>{formatFileSize(d.fileSize)}</td>
              <td>
                <span className={`status-badge status-${d.status}`}>{d.status}</span>
              </td>
              <td>{formatDate(d.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
