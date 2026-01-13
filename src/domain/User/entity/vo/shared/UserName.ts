

export class UserName {
    private readonly name: string;

    private constructor(name: string) {
        this.name = name;
    }

    public static create(name: string): UserName {
        const validatedName: string = this.validateName(name);
        return new UserName(validatedName);
    }

    private static validateName(name: string): string {
        if(!name) throw new Error("Name is required");

        const trimmedName = name.trim();

        if(trimmedName.length < 2) throw new Error("Name is less than 2 characters long");
        if(trimmedName.length > 50) throw new Error("Name have too many characters");

        return trimmedName;
    }

    public getValue(): string {
        return this.name;
    }

    public toString(): string {
        return `User Name: ${this.name}`;
    }

    public equals(otherName: UserName): boolean {
        if (!otherName) return false;
        return this.name === otherName.name;
    }
}