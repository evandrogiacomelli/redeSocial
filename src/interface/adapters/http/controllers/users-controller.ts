// @ts-ignore
import { Request, Response } from "express";
import { container } from "../container/user-container";
import { CreateUserCommand } from "../../../../application/user/command/createUser-command";
import { validateCreateUserRequest } from "../validators/create-user-validator";
import { toCreateUserResponse } from "../mappers/user-mapper";
import { toCreateUserCommand } from "../mappers/create-user-command-mapper";

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
