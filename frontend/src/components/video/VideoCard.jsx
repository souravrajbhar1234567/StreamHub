import { Link } from "react-router-dom";
import { Clock3, Play, Crown } from "lucide-react";

export default function VideoCard({ video }) {
  if (!video) return null;

  const id = video._id || video.id;
  const title = video.title || "Untitled Video";
  const thumbnail =
    video.thumbnailUrl ||
    video.thumbnail ||
    "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=900&q=80";

  return (
    <Link to={`/watch/${id}`} className="video-card">
      <div className="thumb-wrap">
        <img src={thumbnail} alt={title} loading="lazy" />

        {video.isPremium && (
          <span className="premium-badge" title="Premium Content">
            <Crown size={12} /> PRO
          </span>
        )}

        <span className="duration">
          <Clock3 size={12} />
          {video.duration || "10:00"}
        </span>

        <span className="play-overlay">
          <Play fill="currentColor" size={24} />
        </span>
      </div>

      <div className="video-card-body">
        <h3 title={title}>{title}</h3>
        <p className="video-card-meta">
          <span>{video.authorName || "StreamHub"}</span>
          <span>•</span>
          <span>{video.category || "Tech"}</span>
          <span>•</span>
          <span>{video.views || 0} views</span>
        </p>
      </div>
    </Link>
  );
}
