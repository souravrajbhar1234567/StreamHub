import { useState } from "react";
import { RefreshCw, AlertCircle } from "lucide-react";
import { cancelSubscription } from "../../services/subscriptionApi";

export default function RenewalCard({ subscription, onCancelled }) {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to disable auto-renewal? You will keep your access until the end of your billing cycle.")) {
      return;
    }
    try {
      setLoading(true);
      await cancelSubscription();
      if (onCancelled) onCancelled();
    } catch (err) {
      alert("Failed to cancel auto-renewal.");
    } finally {
      setLoading(false);
    }
  };

  if (!subscription || subscription.planName === "Free") return null;

  return (
    <div className="renewal-management-card">
      <div className="renewal-header">
        <RefreshCw size={20} />
        <h4>Billing & Renewal</h4>
      </div>
      <p>
        Auto-renewal is currently{" "}
        <strong>{subscription.autoRenew ? "Enabled" : "Disabled"}</strong>.
      </p>
      {subscription.autoRenew ? (
        <button
          className="btn btn-outline btn-sm text-red-400 mt-2"
          onClick={handleCancel}
          disabled={loading}
        >
          {loading ? "Cancelling..." : "Cancel Auto-Renewal"}
        </button>
      ) : (
        <p className="text-yellow-400 text-sm flex items-center gap-1 mt-2">
          <AlertCircle size={15} /> Your plan will expire at the end of the current period.
        </p>
      )}
    </div>
  );
}
