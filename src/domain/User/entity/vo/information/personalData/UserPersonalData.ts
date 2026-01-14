import {UserBirthDate} from "./UserBirthDate";
import {UserRelationship} from "./UserRelationship";
import {UserBio} from "./UserBio";


export class UserPersonalData{
    private readonly relationshipStatus: UserRelationship;
    private readonly birthDate: UserBirthDate;
    private readonly bio: UserBio;

    private constructor(relationshipStatus: UserRelationship, birthDate: UserBirthDate, bio: UserBio) {
        this.relationshipStatus = relationshipStatus;
        this.birthDate = birthDate;
        this.bio = bio;
    }

    static create(relationshipStatus: string, birthDate: Date, bio: string, instagramLink: string): UserPersonalData {
        const validatedRelationShip: UserRelationship = UserRelationship.create(relationshipStatus);
        const validatedBirthDate: UserBirthDate = UserBirthDate.create(birthDate);
        const validatedProfession: UserBio = UserBio.create(bio);
        return new UserPersonalData(validatedRelationShip, validatedBirthDate, validatedProfession);
    }


    public withRelationship(relationship: UserRelationship): UserPersonalData {
        return new UserPersonalData(
            relationship,
            this.birthDate,
            this.bio,
        )
    }

    public withBirthDate(birthdate: UserBirthDate): UserPersonalData {
        return new UserPersonalData(
            this.relationshipStatus,
            birthdate,
            this.bio,
        )
    }

    public withBio(bio: UserBio): UserPersonalData {
        return new UserPersonalData(
            this.relationshipStatus,
            this.birthDate,
            bio,
        )
    }

    public getRelationship(): UserRelationship {
        return this.relationshipStatus;
    }

    public getBirthDate(): UserBirthDate {
        return this.birthDate;
    }

    public getBio(): UserBio {
        return this.bio;
    }


    public toString(): string {
        return `
        UserPersonalData {
        User Relationship: ${this.relationshipStatus.toString()},
        User Birthdate: ${this.birthDate.toString()},
        User bio: ${this.bio.toString()},
        }`;
    }

    public equals(otherData: UserPersonalData): boolean {
        if (!otherData) return false;
        return this.relationshipStatus.equals(otherData.relationshipStatus) &&
               this.birthDate.equals(otherData.birthDate) &&
               this.bio.equals(otherData.bio);
    }
}
