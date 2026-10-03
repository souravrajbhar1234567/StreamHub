import { RefreshCw } from "lucide-react";

export default function ReconnectOverlay({ isReconnecting }) {
  if (!isReconnecting) return null;

  return (
    <div className="reconnect-overlay">
      <div className="reconnect-card">
        <RefreshCw size={32} className="animate-spin text-purple-400" />
        <h4>Reconnecting to Meeting...</h4>
        <p>Please hold on while we restore your network connection.</p>
      </div>
    </div>
  );
}
