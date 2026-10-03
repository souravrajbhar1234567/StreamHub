import { Crown, CheckCircle, Calendar } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function SubscriptionStatus({ subscription, membership = "Free" }) {
  const planName = subscription?.planName || membership;
  const isPaid = planName !== "Free";

  return (
    <div className="subscription-status-card">
      <div className="sub-status-header">
        <div className="sub-status-icon">
          <Crown size={32} />
        </div>
        <div className="sub-status-info">
          <span className="sub-status-badge">CURRENT ACTIVE PLAN</span>
          <h2>{planName} Membership</h2>
          <p className="sub-status-desc">
            {isPaid
              ? "Your subscription is currently active with full access to premium features."
              : "You are currently on the Free plan with limited features."}
          </p>
        </div>
        <div className="sub-active-pill">
          <CheckCircle size={16} /> Active
        </div>
      </div>

      {subscription?.endDate && (
        <div className="sub-expiry-row">
          <Calendar size={16} />
          <span>Renews / Expires on: <strong>{formatDate(subscription.endDate)}</strong></span>
        </div>
      )}
    </div>
  );
}
