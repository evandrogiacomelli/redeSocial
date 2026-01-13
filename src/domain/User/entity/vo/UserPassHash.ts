export class UserPassHash {
    public readonly value: string;

    private constructor(hash: string) {
        this.value = hash;
    }

    public static create(hash: string) {
        return new UserPassHash(this.validate(hash));
    }

    private static validate(hash: string) {
        const value = hash?.trim();
        if (!value) throw new Error("Password hash is required");
        return value;
    }

    public getValue() {
        return this.value;
    }

    public toString(): string {
        return this.value;
    }

    public equals(other: UserPassHash): boolean {
        if (!other) return false;
        return this.value === other.value;
    }
}
