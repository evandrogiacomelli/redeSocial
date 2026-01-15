import {IUserRepository} from "../../../domain/User/ports/IUserRepository";
import {PasswordHasher} from "../ports/password-hasher";
import {UserLoginCommand} from "../command/userLogin-command";
import {AuthUser} from "../../../domain/User/ports/authUser";
import {UserEmail} from "../../../domain/User/entity/vo/information/profileInfo/UserEmail";
import {TokenService} from "../ports/token-service";
import {TokenPayload} from "../ports/token-payload";
import {LoginResult} from "../ports/login-result";


export class LoginService {

    constructor(
        private readonly repository: IUserRepository,
        private readonly passwordHasher: PasswordHasher,
        private readonly tokenService: TokenService
    ) {}

    async execute(command: UserLoginCommand): Promise<LoginResult | null> {

        const userEmail: UserEmail = UserEmail.create(command.email);
        const userAuth: AuthUser | null = await this.repository.findByEmail(userEmail);
        if (!userAuth) return null;
        if (!userAuth.isActive) return null;

        const compare: boolean = await this.passwordHasher.compare(command.password, userAuth.passwordHash);
        if (!compare) return null;

        const payload: TokenPayload = {
            sub: userAuth.id,
            email: userAuth.email,
        }

        return this.tokenService.signIn(payload);
    }
}