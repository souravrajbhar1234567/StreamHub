import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, Clock, PlayCircle } from "lucide-react";
import { getWatchHistory, clearWatchHistory } from "../../services/videoApi";
import { formatDate } from "../../utils/formatDate";
import Loader from "../../components/common/Loader";

export default function WatchHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = () => {
    setLoading(true);
    getWatchHistory()
      .then((res) => setHistory(res.data.history || []))
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleClear = async () => {
    if (!window.confirm("Are you sure you want to clear your entire watch history?")) return;
    await clearWatchHistory();
    setHistory([]);
  };

  if (loading) return <Loader message="Loading your watch history..." />;

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="eyebrow">ACTIVITY</span>
          <h1>Watch History</h1>
        </div>

        {history.length > 0 && (
          <button
            className="btn btn-outline btn-sm text-red-400"
            onClick={handleClear}
          >
            <Trash2 size={16} /> Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="empty-state py-12">
          <Clock size={48} className="text-muted mx-auto mb-3" />
          <h3>No Watch History</h3>
          <p className="text-muted mt-1">Videos you watch will appear here.</p>
          <Link to="/videos" className="btn btn-primary mt-4">
            Explore Videos
          </Link>
        </div>
      ) : (
        <div className="watch-history-list">
          {history.map((item) => {
            const video = item.video;
            if (!video) return null;

            return (
              <div key={item._id} className="history-item">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="history-thumb"
                />

                <div className="history-details">
                  <h4>{video.title}</h4>
                  <p className="text-xs text-muted">
                    {video.authorName || "StreamHub"} • {video.category} • Watched on {formatDate(item.watchedAt)}
                  </p>
                </div>

                <Link
                  to={`/watch/${video._id}`}
                  className="btn btn-sm btn-ghost"
                  title="Watch again"
                >
                  <PlayCircle size={18} />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
