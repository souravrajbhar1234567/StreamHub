import { Link } from "react-router-dom";
import { Check, Crown, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Get started with StreamHub",
    icon: Zap,
    features: [
      "Watch free videos",
      "Basic video quality",
      "Create your profile",
      "Comment on videos",
    ],
  },
  {
    name: "Pro",
    price: "₹299",
    description: "For regular viewers",
    icon: Crown,
    popular: true,
    features: [
      "HD video streaming",
      "Download videos",
      "Watch history",
      "Priority support",
      "No advertisements",
    ],
  },
  {
    name: "Premium",
    price: "₹599",
    description: "Complete StreamHub experience",
    icon: Crown,
    features: [
      "4K video streaming",
      "Unlimited downloads",
      "Premium content",
      "Online meetings",
      "Priority support",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="page-container">
      <section className="pricing-header">
        <span className="eyebrow">STREAMHUB PLANS</span>

        <h1>Choose your experience</h1>

        <p>
          Start free and upgrade whenever you want more features.
        </p>
      </section>

      <div className="pricing-grid">
        {plans.map((plan) => {
          const Icon = plan.icon;

          return (
            <div
              className={`pricing-card ${
                plan.popular ? "pricing-card-popular" : ""
              }`}
              key={plan.name}
            >
              {plan.popular && (
                <div className="popular-badge">MOST POPULAR</div>
              )}

              <div className="plan-icon">
                <Icon size={26} />
              </div>

              <h2>{plan.name}</h2>

              <p className="plan-description">
                {plan.description}
              </p>

              <div className="plan-price">
                {plan.price}
                {plan.name !== "Free" && (
                  <span>/month</span>
                )}
              </div>

              <ul className="plan-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={17} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to={
                  plan.name === "Free"
                    ? "/register"
                    : "/plans"
                }
                className={`btn ${
                  plan.popular
                    ? "btn-primary"
                    : "btn-outline"
                } plan-button`}
              >
                {plan.name === "Free"
                  ? "Get Started"
                  : "Choose Plan"}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}