import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Play, Clock3, Eye, ThumbsUp, Crown, ArrowLeft } from "lucide-react";
import { getVideo } from "../../services/videoApi";
import Loader from "../../components/common/Loader";
import DownloadButton from "../../components/downloads/DownloadButton";
import { useDownload } from "../../hooks/useDownload";

export default function VideoDetails() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { startDownload, downloadingId } = useDownload();

  useEffect(() => {
    getVideo(id)
      .then((res) => setVideo(res.data.video || res.data.data))
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader message="Loading video details..." />;
  if (!video) return <div className="page-container">Video not found.</div>;

  return (
    <div className="page-container">
      <Link to="/videos" className="back-link mb-4">
        <ArrowLeft size={16} /> Back to videos
      </Link>

      <div className="video-details-hero">
        <div className="video-details-thumb">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80";
            }}
          />
          <Link to={`/watch/${video._id}`} className="play-button-overlay">
            <Play size={48} fill="white" />
          </Link>
        </div>

        <div className="video-details-info">
          <div className="flex items-center gap-2 mb-2">
            <span className="category-tag">{video.category}</span>
            {video.isPremium && (
              <span className="premium-badge">
                <Crown size={12} /> PRO
              </span>
            )}
          </div>

          <h1>{video.title}</h1>
          <p className="video-details-author">By {video.authorName || "StreamHub"}</p>

          <div className="video-stats-strip">
            <span><Clock3 size={15} /> {video.duration}</span>
            <span><Eye size={15} /> {video.views} views</span>
            <span><ThumbsUp size={15} /> {video.likes} likes</span>
          </div>

          <p className="video-long-desc">{video.description}</p>

          <div className="video-details-cta">
            <Link to={`/watch/${video._id}`} className="btn btn-primary btn-lg">
              <Play size={18} fill="currentColor" /> Watch Now
            </Link>

            <DownloadButton
              videoId={video._id}
              onDownload={startDownload}
              downloading={downloadingId === video._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
