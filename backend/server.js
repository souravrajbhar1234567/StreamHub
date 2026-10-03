import http from "http";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { ENV } from "./src/config/env.js";
import { initSocketServer } from "./src/sockets/socketServer.js";

// Seeders
import { seedAdmin } from "./src/seeders/adminSeeder.js";
import { seedPlans } from "./src/seeders/planSeeder.js";
import { seedVideos } from "./src/seeders/videoSeeder.js";

// Background Jobs
import { cleanupExpiredSessions } from "./src/jobs/cleanupSessionsJob.js";
import { checkSubscriptionExpiries } from "./src/jobs/subscriptionExpiryJob.js";
import { resetMonthlyQuotas } from "./src/jobs/quotaResetJob.js";

const server = http.createServer(app);

// Initialize Socket.IO
initSocketServer(server, ENV.CLIENT_URL);

const startServer = async () => {
  // Connect to Database
  const dbConnection = await connectDB();

  if (dbConnection) {
    // Run initial database seeds
    await seedPlans();
    await seedAdmin();
    await seedVideos();

    // Start background maintenance jobs (runs every hour)
    setInterval(() => {
      cleanupExpiredSessions().catch(() => {});
      checkSubscriptionExpiries().catch(() => {});
      resetMonthlyQuotas().catch(() => {});
    }, 60 * 60 * 1000);
  } else {
    console.warn("⚠️ Continuing server startup in limited database mode.");
  }

  // Start HTTP Server
  server.listen(ENV.PORT, () => {
    console.log("======================================");
    console.log("🚀 StreamHub Backend Running");
    console.log(`🌐 API Server: http://localhost:${ENV.PORT}`);
    console.log(`💻 Client Allowed: ${ENV.CLIENT_URL}`);
    console.log(`🔌 WebSockets: Ready (Meetings, Chat, Signaling)`);
    console.log("======================================");
  });
};

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Port ${ENV.PORT} is already in use.`);
    console.error(`👉 Change PORT in backend/.env or stop the process using port ${ENV.PORT}.`);
    process.exit(1);
  }
  console.error("❌ Server error:", error);
});

// Graceful shutdown
const shutdown = () => {
  console.log("🛑 Gracefully shutting down StreamHub server...");
  server.close(() => {
    console.log("🔒 HTTP and Socket connections closed.");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

startServer();