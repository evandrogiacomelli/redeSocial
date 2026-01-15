import {UserLoginCommand} from "../../../../application/user/command/userLogin-command";

export function toLoginCommandUser(body: any): UserLoginCommand {
    return {
        email: body.email,
        password: body.password
    };
}
