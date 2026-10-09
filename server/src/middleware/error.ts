import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "./validate.js";
import { env, isProd } from "../config/env.js";

/**
 * Central error handler. Every error thrown anywhere in the app
 * funnels through here so responses stay consistent.
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // --- Zod validation errors (thrown directly by a schema) ---
  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Validation failed",
      details: err.issues.map((i) => ({
        field: i.path.join(".") || "(root)",
        message: i.message,
      })),
    });
    return;
  }

  // --- Our own operational errors ---
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      ...(err.details !== undefined ? { details: err.details } : {}),
    });
    return;
  }

  // --- Mongoose duplicate key ---
  const mongoErr = err as { code?: number; name?: string };
  if (mongoErr?.code === 11000) {
    const fields = Object.keys((err as { keyPattern?: object }).keyPattern ?? {});
    res.status(409).json({
      message: `Duplicate value for: ${fields.join(", ") || "unique field"}`,
    });
    return;
  }

  // --- Mongoose validation error ---
  if (err instanceof Error && err.name === "ValidationError") {
    const issues = Object.values(
      (err as unknown as { errors: Record<string, { message: string }> }).errors ?? {},
    ).map((e) => e.message);
    res.status(400).json({ message: "Validation failed", details: issues });
    return;
  }

  // --- Mongoose bad ObjectId ---
  if (err instanceof Error && err.name === "CastError") {
    res.status(400).json({ message: "Invalid identifier format" });
    return;
  }

  // --- Unknown / unexpected ---
  const message = err instanceof Error ? err.message : "Internal server error";
  if (!isProd) {
    console.error("🔴 Unhandled error:", err);
  } else {
    console.error("🔴 Unhandled error:", message);
  }

  res.status(500).json({
    message: isProd ? "Internal server error" : message,
  });
}

/** 404 catch-all for unmatched API routes. */
export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ message: "Route not found" });
}

/** Logs every incoming request in dev. */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  if (isProd) return next();
  const start = process.hrtime.bigint();
  res.on("finish", () => {
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    const line = `${req.method} ${req.originalUrl} → ${res.statusCode} (${ms.toFixed(1)}ms)`;
    console.log(res.statusCode >= 400 ? `🔴 ${line}` : `🟢 ${line}`);
  });
  next();
}

/** Rejects requests when a critical dependency is unavailable. */
export function requireEnv(name: keyof typeof env) {
  return (_req: Request, _res: Response, next: NextFunction): void => {
    if (!env[name]) {
      next(new AppError(`${name} is not configured on the server`, 503));
      return;
    }
    next();
  };
}
