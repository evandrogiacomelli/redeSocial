export interface CreateUserCommand {
    userName: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    birth: Date;
    location: {
        country: string;
        state: string;
        city: string;
    };
    relationship: string;
    bio: string;
    visibility: string;
}
