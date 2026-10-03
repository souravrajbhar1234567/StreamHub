import { Link, useLocation } from "react-router-dom";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function PaymentFailed() {
  const location = useLocation();
  const errorMsg = location.state?.error || "We could not process your transaction.";

  return (
    <div className="page-container text-center py-16">
      <div className="payment-status-card max-w-md mx-auto">
        <div className="text-red-400 mb-4 inline-block">
          <AlertCircle size={64} />
        </div>

        <h1>Payment Failed</h1>
        <p className="text-muted mt-2">{errorMsg}</p>

        <div className="payment-status-actions mt-8 flex flex-col gap-3">
          <Link to="/plans" className="btn btn-primary">
            <RefreshCw size={16} /> Try Again
          </Link>
          <Link to="/dashboard" className="btn btn-ghost">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
