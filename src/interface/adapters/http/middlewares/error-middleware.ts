// @ts-ignore
import { Request, Response, NextFunction } from "express";
import { mapError } from "./error-mapper";

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const mapped = mapError(error);

  res.status(mapped.status).json({
    errorCode: mapped.errorCode,
    message: mapped.message,
  });
}
