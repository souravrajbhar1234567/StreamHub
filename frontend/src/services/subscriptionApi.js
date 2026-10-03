import api from "./api";

export const getPlans = async () => {
  return api.get("/subscriptions/plans");
};

export const getMySubscription = async () => {
  return api.get("/subscriptions/my");
};

export const activateSubscription = async (planCode) => {
  return api.post("/subscriptions/subscribe", { planCode });
};

export const cancelSubscription = async () => {
  return api.post("/subscriptions/cancel");
};

export default {
  getPlans,
  getMySubscription,
  activateSubscription,
  cancelSubscription,
};
