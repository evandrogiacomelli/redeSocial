import { IUserRepository } from "../../../domain/User/ports/IUserRepository";
import { User } from "../../../domain/User/entity/User";
import { UserId } from "../../../domain/User/entity/vo/UserId";
import { UserListResult } from "../../../domain/User/ports/user-list-result";
import { postgresPool } from "../../db/postgresPool";
import { mapUserRow } from "./user-row-mapper";
import {UserInformation} from "../../../domain/User/entity/vo/information/UserInformation";
import {UserProfileInfo} from "../../../domain/User/entity/vo/information/profileInfo/UserProfileInfo";
import {UserPersonalData} from "../../../domain/User/entity/vo/information/personalData/UserPersonalData";
import {UserLocation} from "../../../domain/User/entity/vo/information/location/UserLocation";
import {QueryResult} from "pg";
import {UserEmail} from "../../../domain/User/entity/vo/information/profileInfo/UserEmail";
import {AuthUser} from "../../../domain/User/ports/authUser";

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
        const text = `INSERT INTO users (${columns.join(", ")}) VALUES (${placeholders})`;

        await this.pool.query(text, values);
    }



    public async findById(id: UserId): Promise<User | null> {
        const text = `SELECT * FROM users WHERE id = $1 LIMIT 1`;

        const result: QueryResult = await this.pool.query(text, [id.getValue()]);
        if (result.rowCount === 0) return null;
        return mapUserRow(result.rows[0]);
    }

    public async list(page: number, limit: number): Promise<UserListResult> {

        const currentPage: number = Math.max(1, page);
        const currentLimit: number = Math.max(1, limit);
        const offset: number = (currentPage - 1) * currentLimit;

        const text = `SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2`;
        const countText = `SELECT COUNT(*)::int AS total FROM users`;

        const [dataResult, countResult] = await Promise.all([
            this.pool.query(text, [currentLimit, offset]),
            this.pool.query(countText),
        ]);

        const totalItems: number = Number(countResult.rows[0]?.total ?? 0);
        const totalPages: number = Math.ceil(totalItems / currentLimit);

        return {
            data: dataResult.rows.map(mapUserRow),
            pagination: {
                page: currentPage,
                limit: currentLimit,
                totalItems,
                totalPages,
            },
        };
    }

    public async findByEmail(email: UserEmail): Promise<AuthUser | null> {

        const text = `SELECT id, email, password_hash, is_active FROM users WHERE email = $1 LIMIT 1`;
        const data: QueryResult = await this.pool.query(text, [email.getValue()]);

        if (data.rowCount === 0) return null;

        const row = data.rows[0];
        return {
            id: row.id,
            email: row.email,
            passwordHash: row.password_hash,
            isActive: row.is_active,
        };
    }

    public async update(user: User): Promise<void> {
        const info: UserInformation = user.getInfo();
        const profile: UserProfileInfo = info.getInfo();
        const data: UserPersonalData = info.getData();
        const location: UserLocation = info.getLocation();

        const columns = [
            "name",
            "phone",
            "birth",
            "country",
            "state",
            "city",
            "relationship",
            "bio",
            "visibility",
            "updated_at",
        ];

        const values: (string | boolean | number | Date | null)[] = [
            profile.getName().getValue(),
            profile.getPhoneNumber().getValue(),
            data.getBirthDate().getValue(),
            location.getCountry().getValue(),
            location.getState().getValue(),
            location.getCity().getValue(),
            data.getRelationship().getValue(),
            data.getBio().getValue(),
            user.getVisibility().getValue(),
            user.getUpdatedAt(),
        ];

        const assignments = columns.map((col, index) => `${col} = $${index + 1}`).join(", ");
        const text = `UPDATE users SET ${assignments} WHERE id = $${columns.length + 1}`;
        const params = values.concat(user.getId().getValue());

        await this.pool.query(text, params);
    }

    public async deleteUser(user: User): Promise<void> {
        const columns = [
            "is_active",
            "updated_at",
            "deleted_at",
        ];

        const values: (boolean | Date | null | string)[] = [
            user.isActive(),
            user.getUpdatedAt(),
            user.getDeletedAt(),
        ];

        const assignments = columns.map((col, index) => `${col} = $${index + 1}`).join(", ");
        const text = `UPDATE users SET ${assignments} WHERE id = $${columns.length + 1}`;
        const params = values.concat(user.getId().getValue());

        await this.pool.query(text, params);
    }
}
