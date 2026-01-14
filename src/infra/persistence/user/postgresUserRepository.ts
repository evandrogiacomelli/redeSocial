import {IUserRepository} from "../../../domain/User/ports/IUserRepository";
import {User} from "../../../domain/User/entity/User";
import {postgresPool} from "../../db/postgresPool";

export class postgresUserRepository implements IUserRepository {
    private readonly pool = postgresPool;

    public async save(user: User): Promise<void> {
        const info = user.getInfo();
        const profile = info.getInfo();
        const data = info.getData();
        const location = info.getLocation();

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

        const values = [
            user.getId().getValue(),
            profile.getUsername().getValue(),
            profile.getName().getValue(),
            profile.getEmail().getValue(),
            profile.getPhoneNumber().getValue(),
            data.getBirthDate(),
            location.getCountry().getValue(),
            location.getState().getValue(),
            location.getCity().getValue(),
            data.getRelationship().getValue(),
            data.getBio(),
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

}
