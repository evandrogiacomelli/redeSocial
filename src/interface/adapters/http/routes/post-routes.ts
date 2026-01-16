import {Router} from "express";
import {authMiddleware} from "../auth/auth-middleware";
import {CreatePostController} from "../controllers/post-controller";

export const postRoutes = Router();

postRoutes.post("/", authMiddleware, CreatePostController);