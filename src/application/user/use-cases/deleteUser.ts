import {User} from "../../../domain/User/entity/User";
import {IUserRepository} from "../../../domain/User/ports/IUserRepository";
import {UserId} from "../../../domain/User/entity/vo/UserId";

export class DeleteUserService {
    constructor(
        private readonly repository: IUserRepository
    ) {}


    async execute(id: string): Promise<boolean | null> {

        const userId: UserId = UserId.create(id);
        if (!userId) return null;

        const user: User | null = await this.repository.findById(userId);
        if (!user) return null;

        user.touch();
        user.inactivate();

        await this.repository.deleteUser(user);

        return true;
    }
}
