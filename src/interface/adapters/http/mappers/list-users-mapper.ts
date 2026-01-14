import { ListUsersResponseDto } from "../dtos/responses/list-users-response";
import { UserListResult } from "../../../../domain/User/ports/user-list-result";
import { User } from "../../../../domain/User/entity/User";

export function toListUsersResponse(result: UserListResult): ListUsersResponseDto {
  return {
    data: result.data.map((user: User) => ({
      id: user.getId().getValue(),
      userName: user.getInfo().getInfo().getUsername().getValue(),
      name: user.getInfo().getInfo().getName().getValue(),
      visibility: user.getVisibility().getValue(),
      isActive: user.isActive(),
      createdAt: user.getCreatedAt().toISOString(),
    })),
    pagination: {
      page: result.pagination.page,
      limit: result.pagination.limit,
      totalItems: result.pagination.totalItems,
      totalPages: result.pagination.totalPages,
    },
  };
}
