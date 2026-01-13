export class UserUsername {
    private readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static create(username: string): UserUsername {
        const validated = this.validateUsername(username);
        return new UserUsername(validated);
    }

    private static validateUsername(username: string): string {
        if (!username) throw new Error("Username is required");
        const normalized = username.trim().toLowerCase();
        if (normalized.length < 3) throw new Error("Username is too short");
        if (normalized.length > 30) throw new Error("Username is too long");
        if (!/^[a-z0-9._]+$/.test(normalized)) {
            throw new Error("Username has invalid characters");
        }
        return normalized;
    }

    public getValue(): string {
        return this.value;
    }

    public equals(other: UserUsername): boolean {
        if (!other) return false;
        return this.value === other.value;
    }
}
