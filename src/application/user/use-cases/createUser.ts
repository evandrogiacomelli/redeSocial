import {IUserRepository} from "../../../domain/User/ports/IUserRepository";
import {CreateUserCommand} from "../command/createUser-command";
import {User} from "../../../domain/User/entity/User";
import {UserCreationData} from "../../../domain/User/entity/UserCreationData";

export class CreateUserService {
    constructor(
        private readonly repository: IUserRepository,
    ) {}

    async execute(command: CreateUserCommand): Promise<User> {

        const data: UserCreationData = {
            userName: command.userName,
            name: command.name,
            email: command.email,
            phone: command.phone,
            relationship: command.relationship,
            birth: command.birth,
            bio: command.bio,
            visibility: command.visibility,
            password: command.password,
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
