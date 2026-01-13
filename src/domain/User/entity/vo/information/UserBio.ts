

export class UserBio {
    private readonly profession: string;

    private constructor(profession: string) {
        this.profession = profession;
    }

    public static create(profession: string): UserBio {
        const validatedProfession: string = this.validateProfession(profession);
        return new UserBio(validatedProfession);
    }

    private static validateProfession(profession: string): string {
        if (!profession) throw new Error("Profession is required");

        const trimmed: string = profession.trim();

        if (trimmed.length < 3) throw new Error("Profession field is too short");
        if (trimmed.length > 60) throw new Error("Profession field is too large");

        return trimmed;
    }


    public getValue(): string {
        return this.profession;
    }

    public toString(): string {
        return `User Profession: ${this.profession}`;
    }

    public equals(otherProfession: UserBio): boolean {
        if (!otherProfession) return false;
        return this.profession === otherProfession.profession;
    }
}