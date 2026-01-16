import {Router} from "express";
import {authMiddleware} from "../auth/auth-middleware";
import {deleteMeController, getMeController, patchMeController} from "../controllers/users-controller";

export const meRoutes = Router();

meRoutes.get("/", authMiddleware, getMeController);
meRoutes.patch("/", authMiddleware, patchMeController);
meRoutes.delete("/", authMiddleware, deleteMeController);