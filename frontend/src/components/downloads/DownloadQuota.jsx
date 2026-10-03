import { HardDrive } from "lucide-react";

export default function DownloadQuota({ quota }) {
  if (!quota) return null;

  const used = quota.used || 0;
  const limit = quota.downloadLimit || 1;
  const percent = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;
  const tier = quota.membership || "Free";

  return (
    <div className="download-quota-card">
      <div className="quota-header">
        <div className="quota-title">
          <HardDrive size={18} />
          <span>Daily Download Quota ({tier} Plan)</span>
        </div>
        <span className="quota-numbers">
          <strong>{used}</strong> / {limit} video{limit === 1 ? "" : "s"} today
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
          {quota.remaining > 0
            ? `${quota.remaining} download${quota.remaining === 1 ? "" : "s"} remaining today (Resets daily at 00:00 IST)`
            : "Daily download limit reached. Upgrade your plan for higher daily limits or wait until tomorrow."}
        </span>
      </div>
    </div>
  );
}
