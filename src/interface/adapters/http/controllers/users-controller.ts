// @ts-ignore
import {Request, Response} from "express";
import { container } from "../container/user-container";
import {CreateUserCommand} from "../../../../application/user/command/createUser-command";

export async function createUserController(req: Request, res: Response): Promise<void> {
    const command = req.body as CreateUserCommand;
    const user = await container.createUser.execute(command);

    res.status(201).json({
        id: user.getId().getValue(),
        userName: user.getInfo().getInfo().getUsername().getValue(),
        name: user.getInfo().getInfo().getName().getValue(),
        email: user.getInfo().getInfo().getEmail().getValue(),
        phone: user.getInfo().getInfo().getPhoneNumber().getValue(),
        birth: user.getInfo().getData().getBirthDate().getValue().toISOString().slice(0, 10),
        location: {
            country: user.getInfo().getLocation().getCountry().getValue(),
            state: user.getInfo().getLocation().getState().getValue(),
            city: user.getInfo().getLocation().getCity().getValue(),
        },
        relationship: user.getInfo().getData().getRelationship().getValue(),
        bio: user.getInfo().getData().getBio().getValue(),
        visibility: user.getVisibility().getValue(),
        isActive: user.isActive(),
        createdAt: user.getCreatedAt().toISOString(),
        updatedAt: user.getUpdatedAt().toISOString(),
    });
}
