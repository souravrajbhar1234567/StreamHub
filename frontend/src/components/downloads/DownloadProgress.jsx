export default function DownloadProgress({ progress = 0 }) {
  if (progress <= 0 || progress >= 100) return null;

  return (
    <div className="download-progress-wrap">
      <div className="download-progress-bar">
        <div
          className="download-progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="download-progress-text">{progress}% downloaded</span>
    </div>
  );
}
