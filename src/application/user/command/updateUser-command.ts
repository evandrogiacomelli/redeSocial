export interface UpdateUserCommand {
    id: string;
    name?: string;
    phone?: string;
    birth?: Date;
    relationship?: string;
    bio?: string;
    visibility?: string;
    location?: {
        country?: string;
        state?: string;
        city?: string;
    };
}
