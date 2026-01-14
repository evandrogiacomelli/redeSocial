// @ts-ignore
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../http/http-error";

const mockToken = "mock-token-123";

export function mockAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.header("authorization");

  if (!header) {
    throw new HttpError(401, "UNAUTHORIZED", "Missing token");
  }

  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token) {
    throw new HttpError(401, "UNAUTHORIZED", "Missing token");
  }

  if (token !== mockToken) {
    throw new HttpError(401, "UNAUTHORIZED", "Invalid credentials");
  }

  next();
}
