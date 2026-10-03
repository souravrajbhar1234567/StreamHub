import { createContext, useContext } from "react";
import useSubscriptionHook from "../hooks/useSubscription";

const SubscriptionContext = createContext(null);

export function SubscriptionProvider({ children }) {
  const subscriptionState = useSubscriptionHook();

  return (
    <SubscriptionContext.Provider value={subscriptionState}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    return {
      plans: [],
      subscription: null,
      loading: false,
      currentTier: "Free",
      isPro: false,
      isPremium: false,
      refreshSubscription: async () => {},
    };
  }
  return context;
};

export default SubscriptionContext;
