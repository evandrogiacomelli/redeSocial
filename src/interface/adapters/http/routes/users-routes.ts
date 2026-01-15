// @ts-ignore
import { Router } from "express";
import { createUserController, getUserController, listUsersController } from "../controllers/users-controller";

export const usersRoutes = Router();

usersRoutes.post("/", createUserController);
usersRoutes.get("/", listUsersController);
usersRoutes.get("/:id", getUserController);

