

export class UserPhoneNumber {
    private readonly phoneNumber: string;

    private constructor(phoneNumber: string) {
        this.phoneNumber = phoneNumber;
    }

    public static create(phoneNumber: string): UserPhoneNumber {
        const validatedPhoneNumber: string = this.validatePhoneNumber(phoneNumber);
        return new UserPhoneNumber(validatedPhoneNumber);
    }

    private static validatePhoneNumber(phoneNumber: string): string {
        if(!phoneNumber) throw new Error("Phone number is required");

        const trimmedPhoneNumber = phoneNumber.trim();

        const phoneRegex =  /^[+]?[0-9\s\-()]{10,20}$/;
        if(!phoneRegex.test(trimmedPhoneNumber)) throw new Error("Invalid phone number");

        return trimmedPhoneNumber;
    }


    public getValue(): string {
        return this.phoneNumber;
    }

    public toString(): string {
        return `User Phone Number: ${this.phoneNumber}`;
    }

    public equals(otherPhone: UserPhoneNumber): boolean {
        if (!otherPhone) return false;
        return this.phoneNumber === otherPhone.phoneNumber;
    }
}