// @ts-ignore
import { Express } from "express";
import { testRoutes } from "./test-routes";

export function registerRoutes(app: Express): void {
  app.use("/test", testRoutes);
}
