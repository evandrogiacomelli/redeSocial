export interface ListUsersResponseDto {
  data: Array<{
    id: string;
    userName: string;
    name: string;
    visibility: string;
    isActive: boolean;
    createdAt: string;
  }>;
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}
