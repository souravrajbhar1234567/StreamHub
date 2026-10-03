import { PlayCircle, Trash2, HardDrive } from "lucide-react";
import { Link } from "react-router-dom";
import { formatFileSize } from "../../utils/formatFileSize";
import { formatDate } from "../../utils/formatDate";

export default function DownloadCard({ record, onDelete }) {
  const video = record.video || {
    title: record.videoTitle || "Downloaded Video",
    thumbnailUrl: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=600&q=80",
  };

  const videoId = video._id || record.video;

  return (
    <div className="download-card">
      <div className="download-card-thumb">
        <img src={video.thumbnailUrl} alt={video.title} />
        <Link to={`/watch/${videoId}`} className="download-play-overlay">
          <PlayCircle size={32} />
        </Link>
      </div>

      <div className="download-card-content">
        <h4>{video.title}</h4>
        <div className="download-card-meta">
          <span className="quality-tag">{record.quality}</span>
          <span>•</span>
          <span className="size-tag flex items-center gap-1">
            <HardDrive size={13} /> {formatFileSize(record.fileSize)}
          </span>
          <span>•</span>
          <span>{formatDate(record.createdAt)}</span>
        </div>
      </div>

      <div className="download-card-actions">
        <Link to={`/watch/${videoId}`} className="btn btn-sm btn-primary">
          Watch Offline
        </Link>
        <button
          className="icon-btn text-red-400"
          onClick={() => onDelete(record._id)}
          title="Delete download"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
