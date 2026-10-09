import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AdminUser } from "../models/AdminUser.js";
import { AppError, asyncHandler, validateBody } from "../middleware/validate.js";
import { loginSchema } from "../validators/schemas.js";
import {
  clearAuthCookie,
  requireAuth,
  setAuthCookie,
  signToken,
} from "../middleware/auth.js";

/* ================================================================
 *  POST /api/auth/login
 * ================================================================ */

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = validateBody(loginSchema, req.body);

  const user = await AdminUser.findOne({ username: username.toLowerCase() }).lean();

  // Compare against a real hash when the user exists; otherwise run a
  // dummy compare so response timing doesn't reveal whether the user exists.
  const storedHash = (user?.passwordHash ?? "") as string;
  const hash =
    storedHash ||
    "$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidin";

  const valid = await bcrypt.compare(password, hash);

  if (!user || !valid) {
    throw new AppError("Invalid username or password", 401);
  }

  await AdminUser.updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date() } });

  const uname = String(user.username);

  const token = signToken({
    sub: String(user._id),
    username: uname,
    role: "admin",
  });

  setAuthCookie(res, token);

  console.log(`🔓 Admin signed in: ${uname}`);

  res.json({
    ok: true,
    user: { username: uname, role: "admin" },
  });
});

/* ================================================================
 *  POST /api/auth/logout
 * ================================================================ */

export const logout = (_req: Request, res: Response): void => {
  clearAuthCookie(res);
  res.json({ ok: true, message: "Signed out" });
};

/* ================================================================
 *  GET /api/admin/session — lightweight auth probe for the client
 * ================================================================ */

export const session = [
  requireAuth,
  (req: Request, res: Response): void => {
    res.json({ ok: true, user: req.auth });
  },
];
