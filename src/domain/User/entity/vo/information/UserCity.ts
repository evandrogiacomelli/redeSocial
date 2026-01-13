export class UserCity {
    private readonly city: string;

    private constructor(city: string) {
        this.city = city;
    }

    public static create(city: string): UserCity {
        const validatedCity: string = this.validateCity(city);
        return new UserCity(validatedCity);
    }

    private static validateCity(city: string): string {
        if (!city) throw new Error("City must not be empty");
        const trimmed = city.trim();
        if (trimmed.length < 2) throw new Error("City is too short");
        if (trimmed.length > 80) throw new Error("City is too long");
        return trimmed;
    }


    public getValue(): string {
        return this.city;
    }

    public toString(): string {
        return `User City: ${this.city}`;
    }

    public equals(otherCity: UserCity): boolean {
        if (!otherCity) return false;
        return this.city === otherCity.city;
    }
}
