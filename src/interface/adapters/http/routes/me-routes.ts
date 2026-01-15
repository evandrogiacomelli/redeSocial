import {Router} from "express";
import {authMiddleware} from "../auth/auth-middleware";
import {getMeController} from "../controllers/users-controller";

export const meRoutes = Router();

meRoutes.get("/", authMiddleware, getMeController);