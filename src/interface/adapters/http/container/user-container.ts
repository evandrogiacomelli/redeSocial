import {IUserRepository} from "../../../../domain/User/ports/IUserRepository";
import {PostgresUserRepository} from "../../../../infra/persistence/user/PostgresUserRepository";
import {CreateUserService} from "../../../../application/user/use-cases/createUser";
import {GetUserService} from "../../../../application/user/use-cases/getUser";

class UserContainer {
    private userRepository: IUserRepository = new PostgresUserRepository();

    createUser: CreateUserService = new CreateUserService(this.userRepository);
    getUser: GetUserService = new GetUserService(this.userRepository);
}

export const container = new UserContainer();
