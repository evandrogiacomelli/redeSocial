import { Request, Response } from "express";
import { container } from "../container/user-container";
import { CreateUserCommand } from "../../../../application/user/command/createUser-command";
import { validateCreateUserRequest } from "../validators/create-user-validator";
import { validateUpdateMeRequest } from "../validators/update-me-validator";
import { toCreateUserResponse, toGetMeResponse, toGetUserResponse } from "../mappers/user-mapper";
import { toCreateUserCommand } from "../mappers/create-user-command-mapper";
import { toListUsersResponse } from "../mappers/list-users-mapper";
import {User} from "../../../../domain/User/entity/User";
import {UserListResult} from "../../../../domain/User/ports/user-list-result";
import {toUpdateUserCommand} from "../mappers/update-user-command";
import {UpdateUserCommand} from "../../../../application/user/command/updateUser-command";

export async function createUserController(req: Request, res: Response): Promise<void> {
    const errors = validateCreateUserRequest(req.body);
    if (errors) {
        res.status(400).json({
            code: "VALIDATION_ERROR",
            message: "Invalid input",
            details: errors,
        });
        return;
    }

    const command: CreateUserCommand = toCreateUserCommand(req.body);
    const user = await container.createUser.execute(command);

    res.status(201).json(toCreateUserResponse(user));
}

export async function getUserController(req: Request, res: Response): Promise<void> {

    const id: string | string[]  = req.params.id;

    if (!id) {
        res.status(400).json({
            code: "VALIDATION_ERROR",
            message: "Invalid input",
            details: { id: "id is required" },
        });
        return;
    }

    const user: User | null = await container.getUser.execute(id as string);
    if (!user) {
        res.status(404).json({
            code: "NOT_FOUND",
            message: "User not found",
        });
        return;
    }
    res.status(200).json(toGetUserResponse(user));
}



export async function listUsersController(req: Request, res: Response): Promise<void> {
    const page: number = Number(req.query.page ?? 1);
    const limit: number = Number(req.query.limit ?? 10);

    if (!Number.isInteger(page) || page < 1) {
        res.status(400).json({
            code: "VALIDATION_ERROR",
            message: "Invalid input",
            details: { page: "Must be >= 1" },
        });
        return;
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
        res.status(400).json({
            code: "VALIDATION_ERROR",
            message: "Invalid input",
            details: { limit: "Must be between 1 and 100" },
        });
        return;
    }

    const result: UserListResult = await container.listUsers.execute(page, limit);
    res.status(200).json(toListUsersResponse(result));
}

export async function getMeController(req: Request, res: Response): Promise<void> {
    const userId: string | undefined = req.userId;
    if (!userId) {
        res.status(401).json({
            code: "UNAUTHORIZED",
            message: "Authentication required",
        });
        return;
    }

    const user: User | null = await container.getUser.execute(userId);
    if (!user) {
        res.status(404).json({
            code: "NOT_FOUND",
            message: "User not found",
        });
        return;
    }

    res.status(200).json(toGetMeResponse(user));
}

export async function patchMeController(req: Request, res: Response): Promise<void> {
    const userId: string | undefined = req.userId;

    if (!userId) {
        res.status(401).json({
            code: "UNAUTHORIZED",
            message: "Authentication required",
        });
        return;
    }

    const errors = validateUpdateMeRequest(req.body);
    if (errors) {
        res.status(400).json({
            code: "VALIDATION_ERROR",
            message: "Invalid input",
            details: errors,
        });
        return;
    }

    const command: UpdateUserCommand = toUpdateUserCommand(userId, req.body);
    const user: User | null = await container.updateUser.execute(command);

    if (!user) {
        res.status(404).json({
            code: "NOT_FOUND",
            message: "User not found",
        });
        return;
    }

    res.status(200).json(toGetMeResponse(user));
}
