import { useEffect, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ThumbsUp, Crown, Share2 } from "lucide-react";
import { getVideo, getVideos, likeVideo as apiLikeVideo, getWatchProgress } from "../../services/videoApi";
import { useAuth } from "../../context/AuthContext";
import VideoPlayer from "../../components/video/VideoPlayer";
import VideoCard from "../../components/video/VideoCard";
import CommentSection from "../../components/comments/CommentSection";
import DownloadButton from "../../components/downloads/DownloadButton";
import UpgradeModal from "../../components/subscriptions/UpgradeModal";
import Loader from "../../components/common/Loader";
import { useDownload } from "../../hooks/useDownload";

export default function WatchVideo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { startDownload, downloadingId } = useDownload();

  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [initialProgress, setInitialProgress] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [videoRes, relatedRes] = await Promise.all([
        getVideo(id),
        getVideos({ limit: 5 }),
      ]);

      const videoData = videoRes.data.video || videoRes.data.data || videoRes.data;
      setVideo(videoData);
      setLikes(videoData.likes || 0);

      const allRelated = relatedRes.data.videos || relatedRes.data.data || [];
      setRelatedVideos(allRelated.filter((v) => (v._id || v.id) !== id));

      // Fetch saved watch progress
      if (user) {
        getWatchProgress(id)
          .then((progRes) => {
            if (progRes.data?.progress?.progressSeconds) {
              setInitialProgress(progRes.data.progress.progressSeconds);
            }
          })
          .catch(() => {});
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load video.");
    } finally {
      setLoading(false);
    }
  }, [id, user]);

  useEffect(() => {
    loadData();
    window.scrollTo(0, 0);
  }, [loadData]);

  const handleLike = async () => {
    if (!user) return alert("Please log in to like this video.");
    if (hasLiked) return;
    try {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      await apiLikeVideo(id);
    } catch (err) {
      console.warn("Failed to like video:", err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video?.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Video link copied to clipboard!");
    }
  };

  if (loading) return <Loader message="Preparing video stream..." fullScreen />;

  if (error || !video) {
    return (
      <div className="page-container text-center py-16">
        <h2>{error || "Video not found"}</h2>
        <Link to="/videos" className="btn btn-primary mt-4">
          Browse Videos
        </Link>
      </div>
    );
  }

  // Check if premium locked
  const isLocked =
    video.isPremium &&
    user?.membership === "Free" &&
    user?.role !== "admin";

  const nextVideo = relatedVideos[0] || null;

  return (
    <div className="watch-page-container">
      <div className="watch-main-column">
        <div className="watch-header-nav">
          <Link to="/videos" className="back-link">
            <ArrowLeft size={16} /> Back to library
          </Link>
        </div>

        {isLocked ? (
          <div className="premium-locked-banner">
            <Crown size={48} className="text-purple-400 mb-3" />
            <h3>Pro Tier Membership Required</h3>
            <p>
              This video is part of the StreamHub Pro catalog. Upgrade your subscription
              to unlock this stream and all masterclasses.
            </p>
            <button
              className="btn btn-primary mt-4"
              onClick={() => setShowUpgradeModal(true)}
            >
              Unlock with Pro
            </button>
          </div>
        ) : (
          <VideoPlayer
            src={video.videoUrl}
            poster={video.thumbnailUrl}
            title={video.title}
            videoId={video._id}
            initialTime={initialProgress}
            nextVideo={nextVideo}
            onPlayNext={() => nextVideo && navigate(`/watch/${nextVideo._id || nextVideo.id}`)}
          />
        )}

        <div className="watch-details-section">
          <div className="watch-meta-strip">
            <span className="category-tag">{video.category || "Technology"}</span>
            {video.isPremium && (
              <span className="premium-badge">
                <Crown size={12} /> PRO
              </span>
            )}
            <span className="text-xs text-muted">{video.views || 0} views</span>
          </div>

          <h1 className="watch-video-title">{video.title}</h1>

          <div className="watch-actions-bar">
            <div className="watch-author-chip">
              <div className="author-avatar-sm">
                {(video.authorName || "StreamHub").charAt(0).toUpperCase()}
              </div>
              <div>
                <strong>{video.authorName || "StreamHub Creator"}</strong>
                <span className="text-xs text-muted block">Verified Instructor</span>
              </div>
            </div>

            <div className="watch-interactive-buttons">
              <button
                className={`btn btn-secondary btn-sm ${hasLiked ? "liked" : ""}`}
                onClick={handleLike}
              >
                <ThumbsUp size={16} />
                <span>{likes}</span>
              </button>

              <button className="btn btn-secondary btn-sm" onClick={handleShare}>
                <Share2 size={16} />
                <span>Share</span>
              </button>

              <DownloadButton
                videoId={video._id}
                onDownload={startDownload}
                downloading={downloadingId === video._id}
              />
            </div>
          </div>

          <div className="watch-description-box">
            <p>{video.description || "No description provided for this video."}</p>
          </div>
        </div>

        {/* Discussion Section */}
        <div className="watch-comments-wrap mt-8">
          <CommentSection videoId={video._id} currentUser={user} />
        </div>
      </div>

      {/* Related videos sidebar */}
      <aside className="watch-sidebar-column">
        <h3>Related Videos</h3>
        <div className="related-videos-stack">
          {relatedVideos.map((item) => (
            <VideoCard key={item._id || item.id} video={item} />
          ))}
        </div>
      </aside>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature="Pro Video Catalog"
      />
    </div>
  );
}