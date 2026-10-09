import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";

/**
 * Small helper class for throwing intentional HTTP errors
 * anywhere in the app, then letting the error middleware format them.
 */
export class AppError extends Error {
  readonly statusCode: number;
  readonly details?: unknown;

  constructor(message: string, statusCode = 500, details?: unknown) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace?.(this, AppError);
  }
}

export const notFound = (message = "Resource not found") =>
  new AppError(message, 404);

/** Wraps an async route handler so thrown/rejected errors reach the error middleware. */
export const asyncHandler = <
  T extends (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
>(
  fn: T,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Parses `req.body` against a Zod schema, throwing a 400 on failure.
 * Returns the typed, transformed value.
 */
export function validateBody<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const details = result.error.issues.map((i) => ({
      field: i.path.join(".") || "(root)",
      message: i.message,
    }));
    throw new AppError("Validation failed", 400, details);
  }
  return result.data;
}

export function isZodError(err: unknown): err is ZodError {
  return err instanceof ZodError;
}
