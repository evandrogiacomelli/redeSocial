import {IUserRepository} from "../../../domain/User/ports/IUserRepository";
import {User} from "../../../domain/User/entity/User";
import {UserId} from "../../../domain/User/entity/vo/UserId";
import {postgresPool} from "../../db/postgresPool";
import { mapUserRow } from "./user-row-mapper";
import {UserInformation} from "../../../domain/User/entity/vo/information/UserInformation";
import {UserProfileInfo} from "../../../domain/User/entity/vo/information/profileInfo/UserProfileInfo";
import {UserPersonalData} from "../../../domain/User/entity/vo/information/personalData/UserPersonalData";
import {UserLocation} from "../../../domain/User/entity/vo/information/location/UserLocation";
import {QueryResult} from "pg";

export class PostgresUserRepository implements IUserRepository {
    private readonly pool = postgresPool;

    public async save(user: User): Promise<void> {
        const info: UserInformation = user.getInfo();
        const profile: UserProfileInfo = info.getInfo();
        const data: UserPersonalData = info.getData();
        const location: UserLocation = info.getLocation();

        const columns = [
            "id",
            "user_name",
            "name",
            "email",
            "phone",
            "birth",
            "country",
            "state",
            "city",
            "relationship",
            "bio",
            "password_hash",
            "visibility",
            "is_active",
            "created_at",
            "updated_at",
            "deleted_at",
        ];

        const values: (string | boolean | number | Date | null) [] = [
            user.getId().getValue(),
            profile.getUsername().getValue(),
            profile.getName().getValue(),
            profile.getEmail().getValue(),
            profile.getPhoneNumber().getValue(),
            data.getBirthDate().getValue(),
            location.getCountry().getValue(),
            location.getState().getValue(),
            location.getCity().getValue(),
            data.getRelationship().getValue(),
            data.getBio().getValue(),
            user.getPasswordHash().getValue(),
            user.getVisibility().getValue(),
            user.isActive(),
            user.getCreatedAt(),
            user.getUpdatedAt(),
            user.getDeletedAt(),
        ];

        const placeholders = columns.map((col, index) => `$${index + 1}`).join(", ");
        const text = `
            INSERT INTO users (${columns.join(", ")}) VALUES (${placeholders})
        `;

        await this.pool.query(text, values);
    }

    public async findById(id: UserId): Promise<User | null> {
        const text = `SELECT * FROM users WHERE id = $1 LIMIT 1`;

        const result: QueryResult = await this.pool.query(text, [id.getValue()]);
        if (result.rowCount === 0) return null;
        return mapUserRow(result.rows[0]);
    }

}
