import { HardDrive } from "lucide-react";

export default function DownloadQuota({ quota }) {
  if (!quota) return null;

  const used = quota.used || 0;
  const limit = quota.downloadLimit || 0;
  const percent = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;

  return (
    <div className="download-quota-card">
      <div className="quota-header">
        <div className="quota-title">
          <HardDrive size={18} />
          <span>Monthly Download Quota</span>
        </div>
        <span className="quota-numbers">
          <strong>{used}</strong> / {limit === 0 ? "0 (Free Tier)" : `${limit} videos`}
        </span>
      </div>

      <div className="quota-track">
        <div
          className={`quota-fill ${percent >= 90 ? "bg-red-500" : percent >= 70 ? "bg-yellow-500" : "bg-purple-500"}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <div className="quota-footer">
        <span className="text-xs text-muted">
          {limit === 0
            ? "Upgrade to Pro to download up to 25 videos offline every month."
            : `${quota.remaining || 0} downloads remaining this month`}
        </span>
      </div>
    </div>
  );
}
