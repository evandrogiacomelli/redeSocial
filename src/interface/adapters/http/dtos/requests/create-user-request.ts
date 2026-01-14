export interface CreateUserRequestDto {
  userName: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  birth: string;
  location: {
    country: string;
    state: string;
    city: string;
  };
  relationship: string;
  bio: string;
  visibility: string;
}
