

export class UserId {
    public readonly value: string;

    private constructor(id: string) {
        this.value = id;
    }

    public static create(id: string) {
        return new UserId(this.validate(id));
    }

    private static validate(id: string) {
        const value = id?.trim();
        if (!value) throw new Error('id generation error.');
        return value;
    }


    public getValue() {
        return this.value;
    }

    public toString(): string {
        return this.value;
    }

    public equals(other: UserId): boolean {
        if (!other) return false;
        return this.value === other.value;
    }

}