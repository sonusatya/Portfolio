import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "node:path";
import { existsSync } from "node:fs";
import { env, isProd } from "./config/env.js";
import { publicRouter } from "./routes/public.routes.js";
import { adminRouter, authRouter } from "./routes/admin.routes.js";
import { errorHandler, notFoundHandler, requestLogger } from "./middleware/error.js";

export function createApp() {
  const app = express();

  /* ---------------- Security & parsing ---------------- */

  app.set("trust proxy", 1); // needed for correct IPs + HTTPS detection behind Render
  app.disable("x-powered-by");

  app.use(
    helmet({
      // Allow the React SPA (served separately) to load its own assets,
      // and permit the API to be called cross-origin in production.
      crossOriginResourcePolicy: { policy: "cross-origin" },
      contentSecurityPolicy: false,
    }),
  );

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow same-origin / server-to-server requests (no Origin header).
        if (!origin) return callback(null, true);

        const allowed = [
          env.CLIENT_URL,
          "http://localhost:5173",
          "http://127.0.0.1:5173",
          "https://sonukumar.vercel.app",
          "https://sonu-portfolio-client.vercel.app",
        ];

        if (allowed.includes(origin)) return callback(null, true);
        // In dev, be permissive to avoid blocking local tooling.
        if (!isProd) return callback(null, true);

        callback(new Error(`Origin ${origin} not allowed by CORS`));
      },
      credentials: true, // allow the admin auth cookie
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    }),
  );

  app.use(express.json({ limit: "200kb" }));
  app.use(express.urlencoded({ extended: true, limit: "200kb" }));
  app.use(cookieParser());

  if (!isProd) {
    app.use(requestLogger);
  }

  /* ---------------- Routes ---------------- */

  app.use("/api", publicRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/admin", adminRouter);

  /* ---------------- Serve the built client (single-origin deploys) --------- */

  const clientDist = path.resolve(process.cwd(), "../client/dist");
  if (existsSync(clientDist)) {
    app.use(express.static(clientDist));

    // SPA fallback — but never for /api routes (those hit notFound instead).
    app.get(/^\/(?!api\/).*/, (_req, res) => {
      res.sendFile(path.join(clientDist, "index.html"));
    });
  }

  /* ---------------- Error handling ---------------- */

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
