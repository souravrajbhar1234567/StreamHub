import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Clock } from "lucide-react";
import { getContinueWatching } from "../../services/videoApi";
import { formatDuration } from "../../utils/formatDuration";
import Loader from "../../components/common/Loader";

export default function ContinueWatching() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContinueWatching()
      .then((res) => setItems(res.data.continueWatching || []))
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader message="Loading your progress..." />;

  if (items.length === 0) {
    return (
      <div className="empty-state py-8">
        <Clock size={36} className="text-muted mx-auto mb-2" />
        <p className="text-muted">No videos in progress. Pick a video to start watching!</p>
      </div>
    );
  }

  return (
    <div className="continue-watching-grid">
      {items.map((item) => {
        const video = item.video;
        if (!video) return null;

        return (
          <Link
            key={item._id}
            to={`/watch/${video._id}`}
            className="continue-card"
          >
            <div className="continue-thumb">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
                }}
              />
              <div className="continue-progress-bar">
                <div
                  className="continue-progress-fill"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <div className="continue-play-overlay">
                <Play size={24} fill="white" />
              </div>
            </div>

            <div className="continue-info">
              <h4>{video.title}</h4>
              <span className="text-xs text-muted">
                {formatDuration(item.progressSeconds)} / {formatDuration(item.totalDuration)} ({item.percentage}%)
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
