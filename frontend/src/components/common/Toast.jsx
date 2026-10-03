import { useEffect } from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";

export default function Toast({
  message,
  type = "info", // success, error, warning, info
  onClose,
  duration = 4000,
}) {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!message) return null;

  const icons = {
    success: <CheckCircle2 size={18} className="toast-icon text-green-400" />,
    error: <AlertCircle size={18} className="toast-icon text-red-400" />,
    warning: <AlertTriangle size={18} className="toast-icon text-yellow-400" />,
    info: <Info size={18} className="toast-icon text-blue-400" />,
  };

  return (
    <div className={`toast-notification toast-${type}`}>
      {icons[type] || icons.info}
      <span className="toast-message">{message}</span>
      {onClose && (
        <button onClick={onClose} className="toast-close" aria-label="Close notification">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
