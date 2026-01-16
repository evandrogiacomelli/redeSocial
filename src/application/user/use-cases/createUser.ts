import {IUserRepository} from "../../../domain/User/ports/IUserRepository";
import {CreateUserCommand} from "../command/createUser-command";
import {User} from "../../../domain/User/entity/User";
import {UserCreationData} from "../../../domain/User/entity/UserCreationData";
import {PasswordHasher} from "../ports/password-hasher";
import {UserName} from "../../../domain/User/entity/vo/information/profileInfo/UserName";

export class CreateUserService {
    constructor(
        private readonly repository: IUserRepository,
        private readonly passwordHasher: PasswordHasher,
    ) {}

    async execute(command: CreateUserCommand): Promise<User> {

        const hash = await this.passwordHasher.hash(command.password);

        const data: UserCreationData = {
            userName: command.userName,
            name: command.name,
            email: command.email,
            phone: command.phone,
            relationship: command.relationship,
            birth: command.birth,
            bio: command.bio,
            visibility: command.visibility,
            password: hash,
            location: {
                country: command.location.country,
                state: command.location.state,
                city: command.location.city,
            },
        };
        const user: User = User.createFromData(data);

        await this.repository.save(user);
        return user;
    }
}
