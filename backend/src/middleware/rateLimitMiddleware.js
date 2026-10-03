import rateLimit from "express-rate-limit";

const isDev = process.env.NODE_ENV !== "production";

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDev ? 100000 : 1000, // relaxed in development
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Always skip rate limiting in development or localhost requests
    if (isDev) return true;
    const ip = req.ip || req.connection?.remoteAddress || "";
    return (
      ip === "127.0.0.1" ||
      ip === "::1" ||
      ip.includes("127.0.0.1") ||
      ip === "localhost"
    );
  },
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes.",
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDev ? 10000 : 50,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    if (isDev) return true;
    const ip = req.ip || req.connection?.remoteAddress || "";
    return (
      ip === "127.0.0.1" ||
      ip === "::1" ||
      ip.includes("127.0.0.1") ||
      ip === "localhost"
    );
  },
  message: {
    success: false,
    message: "Too many login/registration attempts, please try again after 15 minutes.",
  },
});

export const commentLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: isDev ? 1000 : 30,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isDev,
  message: {
    success: false,
    message: "You are posting comments too quickly. Please wait a minute.",
  },
});

export default { generalLimiter, authLimiter, commentLimiter };
