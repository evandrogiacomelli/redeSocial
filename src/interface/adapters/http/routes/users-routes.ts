// @ts-ignore
import {Router} from "express";
import {createUserController} from "../controllers/users-controller";

export const usersRoutes = Router();

usersRoutes.post("/", createUserController);
