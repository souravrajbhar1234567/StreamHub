import { useState, useEffect, useCallback } from "react";
import { getPlans, getMySubscription } from "../services/subscriptionApi";
import { useAuth } from "./useAuth";

export const useSubscription = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptionData = useCallback(async () => {
    try {
      setLoading(true);
      const [plansRes, mySubRes] = await Promise.all([
        getPlans().catch(() => ({ data: { plans: [] } })),
        user ? getMySubscription().catch(() => ({ data: { subscription: null } })) : Promise.resolve({ data: { subscription: null } }),
      ]);
      setPlans(plansRes.data.plans || []);
      setSubscription(mySubRes.data.subscription || null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSubscriptionData();
  }, [fetchSubscriptionData]);

  const currentTier = user?.membership || subscription?.planName || "Free";
  const isPro = currentTier === "Pro" || currentTier === "Premium" || user?.role === "admin";
  const isPremium = currentTier === "Premium" || user?.role === "admin";

  return {
    plans,
    subscription,
    loading,
    currentTier,
    isPro,
    isPremium,
    refreshSubscription: fetchSubscriptionData,
  };
};

export default useSubscription;
