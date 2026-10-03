import { useState } from "react";
import { Download } from "lucide-react";
import UpgradeModal from "../subscriptions/UpgradeModal";
import { useAuth } from "../../hooks/useAuth";

export default function DownloadButton({ videoId, onDownload, downloading = false }) {
  const { user } = useAuth();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [quality, setQuality] = useState("720p");
  const [showQualityMenu, setShowQualityMenu] = useState(false);

  const handleClick = () => {
    if (!user) {
      alert("Please login to download videos.");
      return;
    }

    if (user.membership === "Free" && user.role !== "admin") {
      setShowUpgradeModal(true);
      return;
    }

    if (onDownload) {
      onDownload(videoId, quality);
    }
  };

  return (
    <div className="download-btn-wrapper">
      <div className="download-split-btn">
        <button
          className="btn btn-outline download-main-btn"
          onClick={handleClick}
          disabled={downloading}
        >
          <Download size={16} />
          <span>{downloading ? "Downloading..." : `Download (${quality})`}</span>
        </button>

        <button
          className="btn btn-outline download-caret-btn"
          onClick={() => setShowQualityMenu(!showQualityMenu)}
          disabled={downloading}
          title="Select quality"
        >
          ▼
        </button>
      </div>

      {showQualityMenu && (
        <div className="download-quality-dropdown">
          {["360p", "720p", "1080p"].map((q) => (
            <button
              key={q}
              className={`quality-option ${q === quality ? "active" : ""}`}
              onClick={() => {
                setQuality(q);
                setShowQualityMenu(false);
              }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature="Offline Video Downloads"
      />
    </div>
  );
}
