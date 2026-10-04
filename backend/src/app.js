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

// Trust reverse proxy (essential for Render, Heroku, Cloudflare)
app.set("trust proxy", 1);

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

const allowedOrigins = [
  "https://streamhub-frontend-ceoi.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
];

if (ENV.CLIENT_URL) {
  ENV.CLIENT_URL.split(",").forEach((url) => {
    const clean = url.trim().replace(/\/$/, "");
    if (clean && !allowedOrigins.includes(clean)) {
      allowedOrigins.push(clean);
    }
  });
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, mobile, server-to-server)
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.trim().replace(/\/$/, "");
      if (
        allowedOrigins.includes(cleanOrigin) ||
        cleanOrigin.endsWith(".onrender.com") ||
        cleanOrigin.includes("localhost") ||
        cleanOrigin.includes("127.0.0.1")
      ) {
        return callback(null, true);
      }
      // Permissive fallback so production requests are never blocked
      return callback(null, origin);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "device-info",
    ],
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
// API ROUTES (Supports both /api and /api/v1)
// ===============================
["/api", "/api/v1"].forEach((prefix) => {
  app.use(`${prefix}/auth`, authRoutes);
  app.use(`${prefix}/users`, userRoutes);
  app.use(`${prefix}/videos`, videoRoutes);
  app.use(`${prefix}/watch`, watchRoutes);
  app.use(`${prefix}/subscriptions`, subscriptionRoutes);
  app.use(`${prefix}/payments`, paymentRoutes);
  app.use(`${prefix}/comments`, commentRoutes);
  app.use(`${prefix}/meetings`, meetingRoutes);
  app.use(`${prefix}/downloads`, downloadRoutes);
  app.use(`${prefix}/admin`, adminRoutes);
  app.use(`${prefix}/security`, securityRoutes);
  app.use(`${prefix}/notifications`, notificationRoutes);
});

// ===============================
// ERROR HANDLING
// ===============================
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
