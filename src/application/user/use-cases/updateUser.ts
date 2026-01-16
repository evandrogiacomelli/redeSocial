import { IUserRepository } from "../../../domain/User/ports/IUserRepository";
import { User } from "../../../domain/User/entity/User";
import { UserId } from "../../../domain/User/entity/vo/UserId";
import { UserName } from "../../../domain/User/entity/vo/information/profileInfo/UserName";
import { UserPhoneNumber } from "../../../domain/User/entity/vo/information/profileInfo/UserPhoneNumber";
import { UserRelationship } from "../../../domain/User/entity/vo/information/personalData/UserRelationship";
import { UserBirthDate } from "../../../domain/User/entity/vo/information/personalData/UserBirthDate";
import { UserBio } from "../../../domain/User/entity/vo/information/personalData/UserBio";
import { UserCountry } from "../../../domain/User/entity/vo/information/location/UserCountry";
import { UserState } from "../../../domain/User/entity/vo/information/location/UserState";
import { UserCity } from "../../../domain/User/entity/vo/information/location/UserCity";
import { UserVisibility } from "../../../domain/User/entity/vo/UserVisibility";
import {UpdateUserCommand} from "../command/updateUser-command";

export class UpdateUserService {
    constructor(
        private readonly repository: IUserRepository
    ) {}

    async execute(command: UpdateUserCommand): Promise<User | null> {

        const userId: UserId = UserId.create(command.id);

        const user: User | null = await this.repository.findById(userId);
        if (!user) return null;

        if (command.name !== undefined) user.changeName(UserName.create(command.name));
        if (command.phone !== undefined) user.changePhoneNumber(UserPhoneNumber.create(command.phone));
        if (command.relationship !== undefined) user.changeRelationship(UserRelationship.create(command.relationship));
        if (command.birth !== undefined) user.changeBirthDate(UserBirthDate.create(command.birth));
        if (command.bio !== undefined) user.changeBio(UserBio.create(command.bio));
        if (command.visibility !== undefined) user.changeVisibility(UserVisibility.create(command.visibility));
        if (command.location?.country !== undefined) user.changeUserCountry(UserCountry.create(command.location.country));
        if (command.location?.state !== undefined) user.changeUserState(UserState.create(command.location.state));
        if (command.location?.city !== undefined) user.changeUserCity(UserCity.create(command.location.city));

        user.touch();
        await this.repository.update(user);
        return user;
    }

}
