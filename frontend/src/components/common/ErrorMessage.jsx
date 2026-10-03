import { AlertCircle } from "lucide-react";

export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null;

  return (
    <div className="error-banner">
      <AlertCircle size={20} className="shrink-0" />
      <span className="flex-1">{message}</span>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-sm btn-ghost">
          Retry
        </button>
      )}
    </div>
  );
}
