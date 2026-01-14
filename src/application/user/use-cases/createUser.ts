import {IUserRepository} from "../../../domain/User/ports/IUserRepository";
import {UserId} from "../../../domain/User/entity/vo/UserId";
import {randomUUID} from "node:crypto";
import {CreateUserCommand} from "../command/createUser-command";
import {User} from "../../../domain/User/entity/User";
import {UserLocation} from "../../../domain/User/entity/vo/information/location/UserLocation";
import {UserPassHash} from "../../../domain/User/entity/vo/UserPassHash";
import {UserVisibility} from "../../../domain/User/entity/vo/UserVisibility";
import {UserInformation} from "../../../domain/User/entity/vo/information/UserInformation";
import {UserProfileInfo} from "../../../domain/User/entity/vo/information/profileInfo/UserProfileInfo";
import {UserPersonalData} from "../../../domain/User/entity/vo/information/personalData/UserPersonalData";

export class CreateUserService {
    constructor(
        private readonly repository: IUserRepository,
    ) {}

    async execute(command: CreateUserCommand): Promise<User> {

        const id: UserId = UserId.create(randomUUID())

        const profileInfo: UserProfileInfo = UserProfileInfo.create(command.userName, command.name, command.email, command.phone);
        const personalData: UserPersonalData = UserPersonalData.create(command.relationship, command.birth, command.bio);
        const location: UserLocation = UserLocation.create(command.location.country, command.location.state, command.location.city);
        const information: UserInformation = UserInformation.create();

        const visibility: UserVisibility = UserVisibility.create();
        const hash: UserPassHash = UserPassHash.create();
        const user: User = User.create(id, information, visibility, hash);

        await this.repository.save(user);
        return user;
    }
}
