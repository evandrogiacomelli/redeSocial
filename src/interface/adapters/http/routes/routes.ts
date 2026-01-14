// @ts-ignore
import { Express } from "express";
import { testRoutes } from "./test-routes";
import {mockAuth} from "../auth/token-service";
import { usersRoutes } from "./users-routes";

export function attachRoutes(app: Express): void {
  app.use("/users", usersRoutes);
  app.use("/test", mockAuth, testRoutes);
}
