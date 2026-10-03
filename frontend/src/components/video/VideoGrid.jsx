import VideoCard from "./VideoCard";

export default function VideoGrid({ videos = [], loading = false, emptyMessage = "No videos available." }) {
  if (loading) {
    return (
      <div className="video-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="video-card-skeleton">
            <div className="skeleton-thumb"></div>
            <div className="skeleton-text skeleton-title"></div>
            <div className="skeleton-text skeleton-sub"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="empty-videos">
        <p className="muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoCard key={video._id || video.id} video={video} />
      ))}
    </div>
  );
}
