export const requireSubscription = (allowedTiers = ["Pro", "Premium"]) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please log in to access this feature.",
      });
    }

    const userTier = req.user.membership || "Free";

    if (!allowedTiers.includes(userTier) && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        requiresUpgrade: true,
        message: `This feature requires a ${allowedTiers.join(" or ")} subscription. Please upgrade your plan.`,
        currentTier: userTier,
      });
    }

    next();
  };
};

export default requireSubscription;
