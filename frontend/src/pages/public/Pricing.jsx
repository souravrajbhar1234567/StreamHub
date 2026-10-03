import { Link } from "react-router-dom";
import { Check, Crown, Zap, Shield, Sparkles } from "lucide-react";

const plans = [
  {
    code: "free",
    name: "Free",
    price: "₹0",
    description: "Get started with basic video learning",
    icon: Zap,
    features: [
      "Access to all free catalog videos",
      "720p HD streaming",
      "1 offline video download per day",
      "Join public video meetings",
      "Community comments & profile",
    ],
  },
  {
    code: "bronze",
    name: "Bronze",
    price: "₹199",
    description: "For active students & learners",
    icon: Shield,
    features: [
      "Full 1080p HD streaming",
      "5 offline video downloads per day",
      "Host video meetings up to 25 people",
      "Resume watch progress across devices",
      "Up to 2 simultaneous devices",
    ],
  },
  {
    code: "silver",
    name: "Silver",
    price: "₹499",
    description: "Most popular for professionals",
    icon: Crown,
    popular: true,
    features: [
      "1080p Full HD high bitrate",
      "15 offline video downloads per day",
      "Host meetings up to 50 participants",
      "Screen sharing & in-call file transfer",
      "100% ad-free video experience",
      "Up to 3 simultaneous devices",
    ],
  },
  {
    code: "gold",
    name: "Gold",
    price: "₹999",
    description: "Complete masterclass & executive suite",
    icon: Sparkles,
    features: [
      "Ultra HD 4K cinema streaming",
      "50 offline downloads / day (Unlimited tier)",
      "Exclusive masterclasses & webinars",
      "Host meetings up to 100 participants",
      "Meeting recording & transcript access",
      "Up to 5 simultaneous devices",
      "Priority 24/7 VIP support",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="page-container">
      <section className="pricing-header">
        <span className="eyebrow">STREAMHUB PLANS</span>
        <h1>Choose Your Experience</h1>
        <p>
          Start with Free or unlock enhanced downloads, high-definition streaming,
          and group video calling with Bronze, Silver, or Gold.
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
                <div className="popular-badge">RECOMMENDED</div>
              )}

              <div className="plan-icon">
                <Icon size={26} />
              </div>

              <h2>{plan.name}</h2>
              <p className="plan-description">{plan.description}</p>

              <div className="plan-price">
                {plan.price}
                {plan.name !== "Free" && <span>/month</span>}
              </div>

              <ul className="plan-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={17} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.name === "Free" ? "/register" : `/checkout?plan=${plan.code}`}
                className={`btn ${
                  plan.popular ? "btn-primary" : "btn-outline"
                } plan-button`}
              >
                {plan.name === "Free" ? "Get Started Free" : `Upgrade to ${plan.name}`}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}