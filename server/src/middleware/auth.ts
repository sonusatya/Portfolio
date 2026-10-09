import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "./validate.js";

export const AUTH_COOKIE = "portfolio_token";

const COOKIE_MAX_AGE_MS = 1000 * 60 * 60 * 8; // 8 hours

export interface AuthPayload {
  sub: string;
  username: string;
  role: "admin";
}

/** Augment Express.Request with the verified auth payload. */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      auth?: AuthPayload;
    }
  }
}

export function signToken(payload: AuthPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "8h",
    algorithm: "HS256",
  });
}

export function verifyToken(token: string): AuthPayload {
  return jwt.verify(token, env.JWT_SECRET, { algorithms: ["HS256"] }) as AuthPayload;
}

export function setAuthCookie(res: Response, token: string): void {
  res.cookie(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_MS,
  });
}

export function clearAuthCookie(res: Response): void {
  res.clearCookie(AUTH_COOKIE, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });
}

/**
 * Express middleware that guards admin-only routes.
 * Rejects with 401 when the JWT cookie is missing, malformed or expired.
 */
export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const token = req.cookies?.[AUTH_COOKIE] as string | undefined;

  if (!token) {
    next(new AppError("Authentication required", 401));
    return;
  }

  try {
    req.auth = verifyToken(token);
    next();
  } catch {
    next(new AppError("Session expired or invalid — please sign in again", 401));
  }
}
