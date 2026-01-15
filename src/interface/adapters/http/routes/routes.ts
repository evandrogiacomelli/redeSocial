// @ts-ignore
import { Express } from "express";
import { testRoutes } from "./test-routes";
import {authMiddleware} from "../auth/auth-middleware";
import { usersRoutes } from "./users-routes";
import {authRoutes} from "./auth-routes";
import {meRoutes} from "./me-routes";

export function attachRoutes(app: Express): void {
  app.use("/users", usersRoutes);
  app.use("/me", authMiddleware, meRoutes);
  app.use("/auth", authRoutes)
  app.use("/test", authMiddleware, testRoutes);
}
