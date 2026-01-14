export interface UserCreationData {
  userName: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
  birth: Date;
  bio: string;
  visibility: string;
  password: string;
  location: {
    country: string;
    state: string;
    city: string;
  };
}
