import { UpdateUserCommand } from "../../../../application/user/command/updateUser-command";

export function toUpdateUserCommand(id: string, body: any): UpdateUserCommand {
    const location = typeof body?.location === "object" && body.location !== null
        ? (body.location as Record<string, unknown>)
        : undefined;

    return {
        id,
        name: typeof body?.name === "string" ? body.name : undefined,
        phone: typeof body?.phone === "string" ? body.phone : undefined,
        birth: typeof body?.birth === "string" ? new Date(body.birth) : undefined,
        location: location
            ? {
                  country: typeof location.country === "string" ? location.country : undefined,
                  state: typeof location.state === "string" ? location.state : undefined,
                  city: typeof location.city === "string" ? location.city : undefined,
              }
            : undefined,
        relationship: typeof body?.relationship === "string" ? body.relationship : undefined,
        bio: typeof body?.bio === "string" ? body.bio : undefined,
        visibility: typeof body?.visibility === "string" ? body.visibility : undefined,
    };
}
