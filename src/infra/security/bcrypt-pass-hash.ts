import {PasswordHasher} from "../../application/user/ports/password-hasher";
import bcrypt from "bcrypt";


export class BcryptPasswordHasher implements PasswordHasher {

    constructor(private readonly rounds = 12) {}

    async hash(plain: string): Promise<string> {
        return bcrypt.hash(plain, this.rounds);
    }
}