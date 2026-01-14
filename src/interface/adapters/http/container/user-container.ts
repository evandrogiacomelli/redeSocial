import {IUserRepository} from "../../domain/User/ports/IUserRepository";
import {PostgresUserRepository} from "../../infra/persistence/user/PostgresUserRepository";
import {CreateUserService} from "../../application/user/use-cases/createUser";

class UserContainer {
    private userRepository: IUserRepository = new PostgresUserRepository();

    createUser: CreateUserService = new CreateUserService(this.userRepository);
}

export const container = new UserContainer();
