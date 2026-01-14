import { IUserRepository } from "../../../domain/User/ports/IUserRepository";
import { User } from "../../../domain/User/entity/User";
import { UserId } from "../../../domain/User/entity/vo/UserId";

export class GetUserService {
  constructor(private readonly repository: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    const userId: UserId = UserId.create(id);
    return this.repository.findById(userId);
  }
}
