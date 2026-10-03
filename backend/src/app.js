import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path from "path";
import { ENV } from "./config/env.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import watchRoutes from "./routes/watchRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js";
import downloadRoutes from "./routes/downloadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import securityRoutes from "./routes/securityRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

// Middlewares
import { securityHeaders } from "./middleware/securityMiddleware.js";
import { generalLimiter } from "./middleware/rateLimitMiddleware.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";

const app = express();

// ===============================
// SECURITY & CORS
// ===============================
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  })
);
app.use(securityHeaders);

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

// ===============================
// BODY PARSERS & COOKIES
// ===============================
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
app.use(cookieParser());

// Static file uploads directory
const uploadsDir = path.resolve(process.cwd(), "uploads");
app.use("/uploads", express.static(uploadsDir));

// Rate limiting for API
app.use("/api", generalLimiter);

// ===============================
// HEALTH CHECK
// ===============================
app.get(["/", "/api/health"], (req, res) => {
  res.status(200).json({
    success: true,
    message: "StreamHub API is running smoothly",
    version: "1.0.0",
    environment: ENV.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ===============================
// API ROUTES
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/watch", watchRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/downloads", downloadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/security", securityRoutes);
app.use("/api/notifications", notificationRoutes);

// ===============================
// ERROR HANDLING
// ===============================
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
