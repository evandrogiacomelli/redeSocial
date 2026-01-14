// @ts-ignore
import { Router } from "express";
import { createUserController, getUserController } from "../controllers/users-controller";

export const usersRoutes = Router();

usersRoutes.post("/", createUserController);
usersRoutes.get("/:id", getUserController);
