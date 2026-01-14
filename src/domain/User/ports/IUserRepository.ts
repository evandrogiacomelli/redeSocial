import {User} from "../entity/User";
import {UserId} from "../entity/vo/UserId";
import {UserEmail} from "../entity/vo/information/profileInfo/UserEmail";
import {UserUsername} from "../entity/vo/information/profileInfo/UserUsername";
import { UserListResult } from "./user-list-result";

export interface IUserRepository {
    save(user: User): Promise<void>;
    findById(id: UserId): Promise<User | null>;
    // findByEmail(email: UserEmail): Promise<User | null>;
    // findByUserName(userName: UserUsername): Promise<User | null>;
    list(page: number, limit: number): Promise<UserListResult>;
    // existsById(id: UserId): Promise<boolean>;
}
