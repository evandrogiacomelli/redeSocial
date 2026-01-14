export interface UserReconstitutionData {
  id: string;
  userName: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
  birth: Date;
  bio: string;
  visibility: string;
  passwordHash: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  location: {
    country: string;
    state: string;
    city: string;
  };
}
