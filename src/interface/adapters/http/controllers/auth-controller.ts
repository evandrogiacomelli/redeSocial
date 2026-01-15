// @ts-ignore
import { Request, Response } from "express";
import { toLoginCommandUser } from "../mappers/login-command-mapper";
import { container } from "../container/user-container";
import { AuthUser } from "../../../../domain/User/ports/authUser";
import {UserLoginCommand} from "../../../../application/user/command/userLogin-command";


export async function loginController(req: Request, res: Response): Promise<void> {
    const errors: Record<string, string> = {};
    const email = req.body?.email;
    const password = req.body?.password;

    if (!email) {
        errors.email = "Invalid format";
    }
    if (!password) {
        errors.password = "Invalid format";
    }

    if (Object.keys(errors).length > 0) {
        res.status(400).json({
            code: "VALIDATION_ERROR",
            message: "Invalid input",
            details: errors,
        });
        return;
    }

    const command: UserLoginCommand = toLoginCommandUser(req.body);
    const result: AuthUser | null = await container.login.execute(command);
    if (!result) {
        res.status(401).json({
            code: "UNAUTHORIZED",
            message: "Invalid credentials",
        });
        return;
    }

    res.status(200).json({
        accessToken: "mock-token-123",
        tokenType: "Bearer",
        expiresInSec: 86400,
    });
}
