import { User } from "../entity/User";

export type UserListResult = {
  data: User[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};
