export interface GetUserResponseDto {
  id: string;
  userName: string;
  name: string;
  birth: string;
  location: {
    country: string;
    state: string;
    city: string;
  };
  relationship: string;
  bio: string;
  visibility: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
