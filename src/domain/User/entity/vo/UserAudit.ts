export class UserAudit {
    private readonly createdAt: Date;
    private readonly updatedAt: Date;
    private readonly deletedAt: Date | null;

    private constructor(createdAt: Date, updatedAt: Date, deletedAt: Date | null) {
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    public static create(createdAt: Date, updatedAt: Date, deletedAt: Date | null): UserAudit {
        return new UserAudit(createdAt, updatedAt, deletedAt);
    }

    public static createDefault(): UserAudit {
        const now = new Date();
        return new UserAudit(now, now, null);
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public getDeletedAt(): Date | null {
        return this.deletedAt;
    }

    public touch(date: Date = new Date()): UserAudit {
        return new UserAudit(this.createdAt, date, this.deletedAt);
    }

    public equals(other: UserAudit): boolean {
        if (!other) return false;
        return this.createdAt.getTime() === other.createdAt.getTime() &&
            this.updatedAt.getTime() === other.updatedAt.getTime() &&
            this.deletedAt?.getTime() === other.deletedAt?.getTime();
    }
}
