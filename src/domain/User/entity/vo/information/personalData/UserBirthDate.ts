

export class UserBirthDate {
    private readonly birthDate: Date;

    private constructor(birthDate: Date) {
        this.birthDate = birthDate;
    }

    static create(birthDate: Date): UserBirthDate {
        const validatedBirthDate: Date = this.validateBirthDate(birthDate);
        const normalizedBirthDate: Date = this.normalizeBirthDate(validatedBirthDate);
        return new UserBirthDate(normalizedBirthDate);
    }

    private static validateBirthDate(birthDate: Date): Date {
        if (!birthDate) throw new Error('Birth date is required');

        const now = new Date();
        if (birthDate > now) throw new Error('Birth date is in the future');

        const age = this.calculateAge(birthDate);
        if (age < 18) throw new Error('User is less than 18 years');
        if (age > 128) throw new Error('User is older than 128 years');

        return birthDate;
    }

    private static calculateAge(birthDate: Date): number {
        const today = new Date();

        const yearDiff = today.getUTCFullYear() - birthDate.getUTCFullYear();

        const birthdayThisYear = new Date(Date.UTC(
            today.getUTCFullYear(),
            birthDate.getUTCMonth(),
            birthDate.getUTCDate()
        ));

        return today >= birthdayThisYear ? yearDiff : yearDiff - 1;
    }

    private static normalizeBirthDate(birthDate: Date): Date {
        return new Date(Date.UTC(birthDate.getUTCFullYear(), birthDate.getUTCMonth(), birthDate.getUTCDate()))
    }


    public getValue(): Date {
        return this.birthDate;
    }

    public toString(): string {
        return `User Birth Date: ${this.birthDate.toISOString().slice(0, 10)}`;;
    }

    public equals(otherBirthdate: UserBirthDate): boolean {
        if (!otherBirthdate) return false;
        return this.birthDate.getTime() === otherBirthdate.birthDate.getTime();
    }
}