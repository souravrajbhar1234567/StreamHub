import { Check, Crown, Zap } from "lucide-react";

export default function PlanCard({ plan, isSelected, onSelect, currentPlanName }) {
  const isCurrent = currentPlanName?.toLowerCase() === plan.code?.toLowerCase();

  return (
    <div
      className={`subscription-plan ${isSelected ? "selected-plan" : ""} ${
        plan.code === "pro" ? "popular-plan" : ""
      }`}
    >
      {plan.code === "pro" && <div className="popular-badge">RECOMMENDED</div>}

      <div className="plan-top">
        {plan.price > 0 ? <Crown size={28} /> : <Zap size={28} />}
        <h2>{plan.name}</h2>
      </div>

      <div className="subscription-price">
        ₹{plan.price}
        {plan.price > 0 && <span>/month</span>}
      </div>

      <p className="plan-meta-devices">
        {plan.maxDevices || 1} Device{(plan.maxDevices || 1) > 1 ? "s" : ""} • Up to {plan.maxResolution || "720p"}
      </p>

      <ul className="plan-features-list">
        {plan.features?.map((feature, idx) => (
          <li key={idx}>
            <Check size={16} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`btn full-width ${
          isCurrent ? "btn-outline" : plan.code === "pro" ? "btn-primary" : "btn-secondary"
        }`}
        disabled={isCurrent}
        onClick={() => onSelect(plan)}
      >
        {isCurrent ? "Current Plan" : plan.price === 0 ? "Select Free" : `Upgrade to ${plan.name}`}
      </button>
    </div>
  );
}
