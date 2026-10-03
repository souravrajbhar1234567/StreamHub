import { Link } from "react-router-dom";
import { useSubscription } from "../../hooks/useSubscription";
import { useAuth } from "../../context/AuthContext";
import SubscriptionStatus from "../../components/subscriptions/SubscriptionStatus";
import RenewalCard from "../../components/subscriptions/RenewalCard";
import BillingHistory from "../../components/subscriptions/BillingHistory";
import Loader from "../../components/common/Loader";

export default function MySubscription() {
  const { user } = useAuth();
  const { subscription, currentTier, loading, refreshSubscription } = useSubscription();

  if (loading) return <Loader message="Loading subscription..." />;

  return (
    <div className="page-container">
      <div className="section-heading">
        <span className="eyebrow">MEMBERSHIP</span>
        <h1>My Subscription</h1>
        <p>Manage your plan, check renewal dates, and view billing history.</p>
      </div>

      <div className="subscription-dashboard-layout mt-6">
        <SubscriptionStatus
          subscription={subscription}
          membership={currentTier}
        />

        <div className="sub-management-row mt-6">
          <RenewalCard
            subscription={subscription}
            onCancelled={refreshSubscription}
          />

          <div className="sub-cta-box">
            <h4>Want more features?</h4>
            <p className="text-muted text-sm mt-1">
              Explore upgraded tiers for higher download quotas and 4K streaming.
            </p>
            <Link to="/plans" className="btn btn-primary btn-sm mt-3 inline-block">
              Change Plan
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <BillingHistory />
        </div>
      </div>
    </div>
  );
}