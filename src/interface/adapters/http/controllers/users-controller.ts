// @ts-ignore
import { Request, Response } from "express";
import { container } from "../container/user-container";
import { CreateUserCommand } from "../../../../application/user/command/createUser-command";
import { validateCreateUserRequest } from "../validators/create-user-validator";
import { toCreateUserResponse, toGetUserResponse } from "../mappers/user-mapper";
import { toCreateUserCommand } from "../mappers/create-user-command-mapper";
import {User} from "../../../../domain/User/entity/User";

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
    const id: string = req.params.id;
    if (!id) {
        res.status(400).json({
            code: "VALIDATION_ERROR",
            message: "Invalid input",
            details: { id: "id is required" },
        });
        return;
    }

    const user: User | null = await container.getUser.execute(id);
    if (!user) {
        res.status(404).json({
            code: "NOT_FOUND",
            message: "User not found",
        });
        return;
    }
    res.status(200).json(toGetUserResponse(user));
}
