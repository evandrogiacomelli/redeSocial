

export class UserEmail {
    private readonly email: string;

    private constructor(email: string) {
        this.email = email;
    }

    public static create(email: string): UserEmail {
        const validatedEmail: string = this.validateEmail(email);
        return new UserEmail(validatedEmail);
    }

    private static validateEmail(email: string): string {
        if(!email) throw new Error("Email is required");

        const normalized = email.trim().toLowerCase();

        const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(normalized)) throw new Error("Invalid email address");

        return normalized;
    }

    public getValue(): string {
        return this.email;
    }

    public toString(): string {
        return `User Email: ${this.email}`;
    }

    public equals(otherEmail: UserEmail): boolean {
        if (!otherEmail) return false;
        return this.email === otherEmail.email;
    }
}