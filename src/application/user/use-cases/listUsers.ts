import { IUserRepository } from "../../../domain/User/ports/IUserRepository";
import { UserListResult } from "../../../domain/User/ports/user-list-result";

export class ListUsersService {
  constructor(private readonly repository: IUserRepository) {}

  async execute(page: number, limit: number): Promise<UserListResult> {
    return this.repository.list(page, limit);
  }
}
