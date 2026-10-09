import { createApp } from "./app.js";
import { connectDB, disconnectDB } from "./config/db.js";
import { env, isProd } from "./config/env.js";
import { ensureAdminUser } from "./scripts/ensureAdmin.js";

const START_TIME = Date.now();

async function bootstrap(): Promise<void> {
  console.log("\n🚀 Starting Sonu Portfolio API…");

  // 1. Database
  try {
    await connectDB();
  } catch (err) {
    console.error("\n❌ Could not connect to MongoDB.");
    console.error("   → Check MONGODB_URI in server/.env\n");
    console.error("   ", (err as Error).message, "\n");
    // In production, fail fast; in dev, keep running so the UI still loads.
    if (isProd) process.exit(1);
  }

  // 2. Ensure the admin account exists (idempotent)
  try {
    await ensureAdminUser();
  } catch (err) {
    console.error("⚠️  Could not ensure admin user:", (err as Error).message);
  }

  // 3. HTTP server
  const app = createApp();

  const server = app.listen(env.PORT, () => {
    const ms = Date.now() - START_TIME;
    console.log(`\n✅ API ready in ${ms}ms`);
    console.log(`   → http://localhost:${env.PORT}/api/health`);
    console.log(`   → Environment: ${env.NODE_ENV}`);
    console.log(
      `   → AI assistant: ${process.env.GEMINI_API_KEY ? "configured" : "NOT configured (fallback mode)"}\n`,
    );
  });

  server.on("error", (err) => {
    if (err.message.includes("EADDRINUSE")) {
      console.error(`\n❌ Port ${env.PORT} is already in use. Set PORT in server/.env\n`);
      process.exit(1);
    }
    throw err;
  });

  /* ------------- Graceful shutdown ------------- */

  let shuttingDown = false;

  const shutdown = async (signal: string) => {
    if (shuttingDown) return;
    shuttingDown = true;

    console.log(`\n🛑 ${signal} received — shutting down gracefully…`);

    server.close(async () => {
      await disconnectDB();
      console.log("👋 Server closed cleanly.");
      process.exit(0);
    });

    // Force exit if connections hang.
    setTimeout(() => {
      console.warn("⚠️  Forcing shutdown after timeout.");
      process.exit(1);
    }, 10_000).unref();
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));

  process.on("unhandledRejection", (reason) => {
    console.error("🔴 Unhandled rejection:", reason);
  });

  process.on("uncaughtException", (err) => {
    console.error("🔴 Uncaught exception:", err);
    process.exit(1);
  });
}

void bootstrap();
