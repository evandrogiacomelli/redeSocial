// @ts-ignore
import { NextFunction, Request, Response } from "express";

const mockToken = "mock-token-123";

export function mockAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.header("authorization");

  if (!header) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  if (token !== mockToken) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  next();
}
