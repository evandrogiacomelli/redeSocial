

export class UserBio {
    private readonly bio: string;

    private constructor(bio: string) {
        this.bio = bio;
    }

    public static create(bio: string): UserBio {
        const validatedBio: string = this.validateBio(bio);
        return new UserBio(validatedBio);
    }

    private static validateBio(bio: string): string {
        if (!bio) throw new Error("Bio is required");

        const trimmed: string = bio.trim();

        if (trimmed.length < 3) throw new Error("Bio field is too short");
        if (trimmed.length > 280) throw new Error("Bio field is too large");

        return trimmed;
    }


    public getValue(): string {
        return this.bio;
    }

    public toString(): string {
        return `User Bio: ${this.bio}`;
    }

    public equals(otherBio: UserBio): boolean {
        if (!otherBio) return false;
        return this.bio === otherBio.bio;
    }
}