import { Link } from "react-router-dom";
import { Download, PlayCircle, Plus } from "lucide-react";
import { useDownload } from "../../hooks/useDownload";
import DownloadQuota from "../../components/downloads/DownloadQuota";
import DownloadProgress from "../../components/downloads/DownloadProgress";
import DownloadHistory from "../../components/downloads/DownloadHistory";
import Loader from "../../components/common/Loader";

export default function Downloads() {
  const { downloads, quota, loading, progress, removeDownload } = useDownload();

  if (loading) return <Loader message="Loading downloaded videos..." />;

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="eyebrow">OFFLINE VIEWING</span>
          <h1>My Downloads</h1>
          <p>Watch your downloaded videos without internet connection.</p>
        </div>

        <Link to="/videos" className="btn btn-primary">
          <Plus size={16} /> Browse Videos
        </Link>
      </div>

      <div className="downloads-dashboard-layout">
        <DownloadQuota quota={quota} />

        <DownloadProgress progress={progress} />

        {downloads.length === 0 ? (
          <div className="empty-state py-12 mt-6">
            <Download size={48} className="text-muted mx-auto mb-3" />
            <h3>No Offline Videos Yet</h3>
            <p className="text-muted mt-1 max-w-sm mx-auto">
              Download your favorite tutorials and tech talks to watch whenever you're offline.
            </p>
            <Link to="/videos" className="btn btn-primary mt-4">
              Browse Videos to Download
            </Link>
          </div>
        ) : (
          <div className="mt-6">
            <DownloadHistory
              downloads={downloads}
              onDelete={removeDownload}
            />
          </div>
        )}
      </div>
    </div>
  );
}
