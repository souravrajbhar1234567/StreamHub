import { useNavigate } from "react-router-dom";
import { useSubscription } from "../../hooks/useSubscription";
import PlanCard from "../../components/subscriptions/PlanCard";
import PlanComparison from "../../components/subscriptions/PlanComparison";
import Loader from "../../components/common/Loader";

export default function SubscriptionPlans() {
  const navigate = useNavigate();
  const { plans, currentTier, loading } = useSubscription();

  const handleSelectPlan = (plan) => {
    if (plan.price === 0) {
      navigate("/dashboard");
      return;
    }
    navigate(`/checkout?plan=${plan.code}`);
  };

  if (loading) return <Loader message="Loading subscription plans..." />;

  return (
    <div className="page-container">
      <div className="section-heading text-center">
        <span className="eyebrow">CHOOSE YOUR ACCESS</span>
        <h1>Simple, Transparent Pricing</h1>
        <p>Start free or upgrade to Pro to unlock downloads and ultra HD streaming.</p>
      </div>

      <div className="plans-grid mt-10">
        {plans.map((plan) => (
          <PlanCard
            key={plan.code}
            plan={plan}
            currentPlanName={currentTier}
            onSelect={handleSelectPlan}
          />
        ))}
      </div>

      <div className="mt-16">
        <PlanComparison />
      </div>
    </div>
  );
}