// @ts-ignore
import { Router } from "express";
import { createUserController, getMeController, getUserController, listUsersController } from "../controllers/users-controller";
import { authMiddleware } from "../auth/auth-middleware";

export const usersRoutes = Router();

usersRoutes.post("/", createUserController);
usersRoutes.get("/", listUsersController);
usersRoutes.get("/:id", getUserController);
