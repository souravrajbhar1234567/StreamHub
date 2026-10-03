import { Crown, Trash2, Edit, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

export default function VideoTable({ videos = [], onDelete, onTogglePremium }) {
  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Video</th>
            <th>Category</th>
            <th>Tier</th>
            <th>Views</th>
            <th>Duration</th>
            <th>Published</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((v) => (
            <tr key={v._id}>
              <td>
                <div className="flex items-center gap-3">
                  <img
                    src={v.thumbnailUrl}
                    alt={v.title}
                    className="admin-video-thumb"
                  />
                  <div>
                    <strong className="block text-sm">{v.title}</strong>
                    <span className="text-xs text-muted">
                      {v.authorName || "StreamHub"}
                    </span>
                  </div>
                </div>
              </td>
              <td>{v.category}</td>
              <td>
                <button
                  className={`tier-tag cursor-pointer ${v.isPremium ? "pro" : "free"}`}
                  onClick={() => onTogglePremium(v._id, !v.isPremium)}
                  title="Click to toggle Premium requirement"
                >
                  {v.isPremium ? "PRO" : "FREE"}
                </button>
              </td>
              <td>{v.views || 0}</td>
              <td>{v.duration || "10:00"}</td>
              <td>{formatDate(v.createdAt)}</td>
              <td>
                <div className="flex items-center gap-1">
                  <Link
                    to={`/watch/${v._id}`}
                    className="btn btn-xs btn-ghost"
                    title="Watch"
                  >
                    <Play size={14} />
                  </Link>
                  <button
                    className="btn btn-xs btn-ghost text-red-400"
                    onClick={() => onDelete(v._id)}
                    title="Delete Video"
                  >
                    <Trash2 size={14} />
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
