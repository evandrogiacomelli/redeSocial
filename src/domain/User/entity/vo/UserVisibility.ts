import {VISIBILITY_STATUS, VisibilityStatusKey} from "./UserVisibilityStatus";

export class UserVisibility {
    public readonly value: VisibilityStatusKey;

    private constructor(value: VisibilityStatusKey) {
        this.value = value;
    }

    public static create(value: string) {
        return new UserVisibility(this.validate(value));
    }

    private static validate(value: string): VisibilityStatusKey {
        if (!value) throw new Error("Visibility is required");
        const normalized = value.trim().toLowerCase();

        for (const key in VISIBILITY_STATUS) {
            const labels = VISIBILITY_STATUS[key as VisibilityStatusKey];
            if (labels.includes(normalized)) {
                return key as VisibilityStatusKey;
            }
        }

        throw new Error("Invalid visibility: " + value);
    }

    public getValue(): VisibilityStatusKey {
        return this.value;
    }

    public toString(): string {
        return this.value;
    }

    public equals(other: UserVisibility): boolean {
        if (!other) return false;
        return this.value === other.value;
    }
}
