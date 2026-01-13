export class UserCountry {
    private readonly country: string;

    private constructor(country: string) {
        this.country = country;
    }

    public static create(country: string): UserCountry {
        const validatedCountry: string = this.validateCountry(country);
        return new UserCountry(validatedCountry);
    }

    private static validateCountry(country: string): string {
        if (!country) throw new Error("Country must not be empty");
        const trimmed = country.trim();
        const normalized = trimmed.toUpperCase();
        if (normalized.length !== 2) throw new Error("Country must have 2 letters");
        return normalized;
    }


    public getValue(): string {
        return this.country;
    }

    public toString(): string {
        return `User Country: ${this.country}`;
    }

    public equals(otherCountry: UserCountry): boolean {
        if (!otherCountry) return false;
        return this.country === otherCountry.country;
    }
}
