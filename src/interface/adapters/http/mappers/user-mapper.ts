import { CreateUserResponseDto } from "../dtos/responses/create-user-response";
import {User} from "../../../../domain/User/entity/User";

export function toCreateUserResponse(user: User): CreateUserResponseDto {
  return {
    id: user.getId().getValue(),
    userName: user.getInfo().getInfo().getUsername().getValue(),
    name: user.getInfo().getInfo().getName().getValue(),
    email: user.getInfo().getInfo().getEmail().getValue(),
    phone: user.getInfo().getInfo().getPhoneNumber().getValue(),
    birth: user.getInfo().getData().getBirthDate().getValue().toISOString().slice(0, 10),
    location: {
      country: user.getInfo().getLocation().getCountry().getValue(),
      state: user.getInfo().getLocation().getState().getValue(),
      city: user.getInfo().getLocation().getCity().getValue(),
    },
    relationship: user.getInfo().getData().getRelationship().getValue(),
    bio: user.getInfo().getData().getBio().getValue(),
    visibility: user.getVisibility().getValue(),
    isActive: user.isActive(),
    createdAt: user.getCreatedAt().toISOString(),
    updatedAt: user.getUpdatedAt().toISOString(),
  };
}
