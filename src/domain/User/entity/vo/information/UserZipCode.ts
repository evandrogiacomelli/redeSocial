

export class UserZipCode {
    private readonly zipCode: string;

    private constructor(zipCode: string) {
        this.zipCode = zipCode;
    }

    public static create(zipCode: string): UserZipCode {
        const validatedZipCode: string = this.validateZipCode(zipCode);
        return new UserZipCode(validatedZipCode);
    }

    private static validateZipCode(zipCode: string): string {
        if (!zipCode) throw new Error("Zip code must not be empty");

        const digits = zipCode.replace(/\D/g, "");
        if (digits.length != 8) throw new Error("Zip code must contain 8 digits");

        return digits;
    }


    public getValue(): string {
        return this.zipCode;
    }

    public toString(): string {
        return `User Zip code: ${this.zipCode}`;
    }

    public equals(otherCode: UserZipCode): boolean {
        if (!otherCode) return false;
        return this.zipCode === otherCode.zipCode;
    }
}