import {IUserRepository} from "../../../domain/User/ports/IUserRepository";
import {PasswordHasher} from "../ports/password-hasher";
import {UserLoginCommand} from "../command/userLogin-command";
import {AuthUser} from "../../../domain/User/ports/authUser";
import {UserEmail} from "../../../domain/User/entity/vo/information/profileInfo/UserEmail";


export class LoginService {

    constructor(
        private readonly repository: IUserRepository,
        private readonly passwordHasher: PasswordHasher
    ) {}

    async execute(command: UserLoginCommand): Promise<AuthUser | null> {

        const userEmail: UserEmail = UserEmail.create(command.email);
        const findUser: AuthUser | null = await this.repository.findByEmail(userEmail);
        if (!findUser) return null;
        if (!findUser.isActive) return null;

        const compare: boolean = await this.passwordHasher.compare(command.password, findUser.passwordHash);
        if (!compare) return null;

        return findUser;
    }
}