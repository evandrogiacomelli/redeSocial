export type AuthUser = {
    id: string;
    email: string;
    passwordHash: string;
    isActive: boolean;
}