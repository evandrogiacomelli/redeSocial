import {IUserRepository} from "../../../domain/User/ports/IUserRepository";
import {User} from "../../../domain/User/entity/User";
import {postgresPool} from "../../db/postgresPool";

export class postgresUserRepository implements IUserRepository {
    private readonly pool = postgresPool;

    save(user: User): Promise<void> {
        return Promise.resolve(undefined);
    }

}
