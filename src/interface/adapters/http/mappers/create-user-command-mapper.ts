import { CreateUserCommand } from "../../../../application/user/command/createUser-command";

export function toCreateUserCommand(body: any): CreateUserCommand {
  return {
    userName: body.userName,
    name: body.name,
    email: body.email,
    password: body.password,
    phone: body.phone,
    birth: new Date(body.birth),
    location: {
      country: body.location.country,
      state: body.location.state,
      city: body.location.city,
    },
    relationship: body.relationship,
    bio: body.bio,
    visibility: body.visibility,
  };
}
