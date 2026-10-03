import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Crown, ArrowRight, PlaySquare } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function PaymentSuccess() {
  const location = useLocation();
  const { loadUser } = useAuth();
  const payment = location.state?.payment;
  const plan = location.state?.plan;

  // Refresh user data so tier upgrades in header
  if (loadUser) {
    loadUser();
  }

  return (
    <div className="page-container text-center py-16">
      <div className="payment-status-card max-w-md mx-auto">
        <div className="text-green-400 mb-4 inline-block">
          <CheckCircle2 size={64} />
        </div>

        <h1>Payment Successful!</h1>
        <p className="text-muted mt-2">
          Your account has been upgraded to <strong>{plan?.name || "Pro"}</strong>.
          You now have access to offline downloads, HD/4K streams, and video meetings.
        </p>

        {payment?.invoiceNumber && (
          <div className="invoice-chip mt-4">
            Invoice Number: <span className="font-mono">{payment.invoiceNumber}</span>
          </div>
        )}

        <div className="payment-status-actions mt-8 flex flex-col gap-3">
          <Link to="/videos" className="btn btn-primary">
            <PlaySquare size={18} /> Start Streaming
          </Link>
          <Link to="/dashboard" className="btn btn-ghost">
            Go to Dashboard <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
