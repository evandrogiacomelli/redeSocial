// @ts-ignore
import { Express } from "express";
import { testRoutes } from "./test-routes";
import {mockAuth} from "../auth/token-service";

export function registerRoutes(app: Express): void {
  app.use("/test", mockAuth, testRoutes);
}
