import DownloadCard from "./DownloadCard";

export default function DownloadHistory({ downloads = [], onDelete }) {
  if (downloads.length === 0) return null;

  return (
    <div className="download-history-list">
      <h3>Saved Offline Videos ({downloads.length})</h3>
      <div className="downloads-stack">
        {downloads.map((item) => (
          <DownloadCard
            key={item._id || item.id}
            record={item}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
