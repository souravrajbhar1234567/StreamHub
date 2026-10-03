import subscriptionService from "../services/subscriptionService.js";

export const getPlans = async (req, res, next) => {
  try {
    const plans = await subscriptionService.getPlans();
    res.status(200).json({ success: true, plans });
  } catch (error) {
    next(error);
  }
};

export const getMySubscription = async (req, res, next) => {
  try {
    const subscription = await subscriptionService.getUserSubscription(
      req.user._id
    );
    res.status(200).json({
      success: true,
      subscription: subscription || {
        planName: req.user.membership || "Free",
        status: "active",
      },
    });
  } catch (error) {
    next(error);
  }
};

export const activateSubscription = async (req, res, next) => {
  try {
    const { planCode } = req.body;
    const subscription = await subscriptionService.activateSubscription(
      req.user._id,
      planCode
    );
    res.status(200).json({
      success: true,
      message: `Successfully subscribed to ${planCode} plan.`,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await subscriptionService.cancelSubscription(
      req.user._id
    );
    res.status(200).json({
      success: true,
      message: "Subscription renewal cancelled.",
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getPlans,
  getMySubscription,
  activateSubscription,
  cancelSubscription,
};
