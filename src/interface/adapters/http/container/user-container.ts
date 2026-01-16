import {IUserRepository} from "../../../../domain/User/ports/IUserRepository";
import {PostgresUserRepository} from "../../../../infra/persistence/user/PostgresUserRepository";
import {CreateUserService} from "../../../../application/user/use-cases/createUser";
import {GetUserService} from "../../../../application/user/use-cases/getUser";
import {ListUsersService} from "../../../../application/user/use-cases/listUsers";
import {PasswordHasher} from "../../../../application/user/ports/password-hasher";
import {BcryptPasswordHasher} from "../../../../infra/security/bcrypt-pass-hash";
import {UpdateUserService} from "../../../../application/user/use-cases/updateUser";

class UserContainer {
    private userRepository: IUserRepository = new PostgresUserRepository();
    private passwordHasher: PasswordHasher = new BcryptPasswordHasher();

    createUser: CreateUserService = new CreateUserService(this.userRepository, this.passwordHasher);
    getUser: GetUserService = new GetUserService(this.userRepository);
    listUsers: ListUsersService = new ListUsersService(this.userRepository);
    updateUser: UpdateUserService = new UpdateUserService(this.userRepository);
}

export const container = new UserContainer();
