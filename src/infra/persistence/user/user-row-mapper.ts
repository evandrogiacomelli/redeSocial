import { User } from "../../../domain/User/entity/User";
import { UserReconstitutionData } from "../../../domain/User/entity/UserReconstitutionData";

export function mapUserRow(row: any): User {
  const data: UserReconstitutionData = {
    id: row.id,
    userName: row.user_name,
    name: row.name,
    email: row.email,
    phone: row.phone,
    relationship: row.relationship,
    birth: row.birth,
    bio: row.bio,
    visibility: row.visibility,
    passwordHash: row.password_hash,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at ?? null,
    location: {
      country: row.country,
      state: row.state,
      city: row.city,
    },
  };

  return User.reconstituteFromData(data);
}
