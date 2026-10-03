import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Crown, ArrowLeft, ShieldCheck } from "lucide-react";
import PaymentButton from "../../components/subscriptions/PaymentButton";
import { getPlans } from "../../services/subscriptionApi";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/common/Loader";

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const planCode = searchParams.get("plan") || "pro";
  const navigate = useNavigate();
  const { user } = useAuth();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlans()
      .then((res) => setPlans(res.data.plans || []))
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader message="Setting up checkout..." />;

  const selectedPlan = plans.find((p) => p.code === planCode) || {
    name: planCode.toUpperCase(),
    price: planCode === "premium" ? 599 : 299,
    code: planCode,
  };

  const handleSuccess = (data) => {
    navigate("/payment-success", { state: { payment: data.payment, plan: selectedPlan } });
  };

  const handleError = (error) => {
    navigate("/payment-failed", { state: { error: error.message } });
  };

  return (
    <div className="page-container">
      <Link to="/plans" className="back-link mb-6">
        <ArrowLeft size={16} /> Choose another plan
      </Link>

      <div className="checkout-container">
        <div className="checkout-summary-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
              <Crown size={28} />
            </div>
            <div>
              <span className="text-xs uppercase text-purple-400 font-semibold tracking-wider">
                CHECKOUT
              </span>
              <h2>{selectedPlan.name} Plan</h2>
            </div>
          </div>

          <div className="checkout-line-items">
            <div className="checkout-row">
              <span>{selectedPlan.name} Monthly Subscription</span>
              <span>₹{selectedPlan.price}</span>
            </div>
            <div className="checkout-row">
              <span>Taxes & Processing Fee</span>
              <span>₹0</span>
            </div>
            <div className="checkout-divider"></div>
            <div className="checkout-row checkout-total">
              <strong>Total Due Today</strong>
              <strong className="text-purple-400 text-xl">₹{selectedPlan.price}</strong>
            </div>
          </div>

          <div className="checkout-payment-box mt-6">
            <PaymentButton
              planCode={selectedPlan.code}
              amount={selectedPlan.price}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>

          <div className="checkout-guarantee mt-4">
            <ShieldCheck size={16} className="text-green-400" />
            <span className="text-xs text-muted">
              256-bit encrypted checkout with Razorpay. Cancel anytime.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
