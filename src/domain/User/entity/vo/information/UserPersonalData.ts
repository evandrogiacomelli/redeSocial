import {UserBirthDate} from "./UserBirthDate";
import {UserRelationship} from "./UserRelationship";
import {UserInstagramLink} from "../shared/UserInstagramLink";
import {UserProfession} from "./UserProfession";


export class UserPersonalData{
    private readonly relationshipStatus: UserRelationship;
    private readonly birthDate: UserBirthDate;
    private readonly profession: UserProfession;
    private readonly instagramLink: UserInstagramLink;

    private constructor(relationshipStatus: UserRelationship, birthDate: UserBirthDate, profession: UserProfession, instagramLink: UserInstagramLink) {
        this.relationshipStatus = relationshipStatus;
        this.birthDate = birthDate;
        this.profession = profession;
        this.instagramLink = instagramLink
    }

    static create(relationshipStatus: string, birthDate: Date, profession: string, instagramLink: string): UserPersonalData {
        const validatedRelationShip: UserRelationship = UserRelationship.create(relationshipStatus);
        const validatedBirthDate: UserBirthDate = UserBirthDate.create(birthDate);
        const validatedProfession: UserProfession = UserProfession.create(profession);
        const validatedInstagramLink: UserInstagramLink = UserInstagramLink.create(instagramLink);
        return new UserPersonalData(validatedRelationShip, validatedBirthDate, validatedProfession, validatedInstagramLink);
    }


    public withRelationship(relationship: UserRelationship): UserPersonalData {
        return new UserPersonalData(
            relationship,
            this.birthDate,
            this.profession,
            this.instagramLink
        )
    }

    public withBirthDate(birthdate: UserBirthDate): UserPersonalData {
        return new UserPersonalData(
            this.relationshipStatus,
            birthdate,
            this.profession,
            this.instagramLink
        )
    }

    public withProfession(profession: UserProfession): UserPersonalData {
        return new UserPersonalData(
            this.relationshipStatus,
            this.birthDate,
            profession,
            this.instagramLink
        )
    }

    public withInstagramLink(instagramLink: UserInstagramLink): UserPersonalData {
        return new UserPersonalData(
            this.relationshipStatus,
            this.birthDate,
            this.profession,
            instagramLink
        )
    }


    public getRelationship(): UserRelationship {
        return this.relationshipStatus;
    }

    public getBirthDate(): Date {
        return this.birthDate.getValue();
    }

    public getProfession(): string {
        return this.profession.getValue();
    }

    public getInstagramLink(): string {
        return this.instagramLink.getValue();
    }

    public toString(): string {
        return `
        UserPersonalData {
        User Relationship: ${this.relationshipStatus.toString()},
        User Birthdate: ${this.birthDate.toString()},
        User profession: ${this.profession.toString()},
        User instagram link: ${this.instagramLink.toString()}
        }`;
    }

    public equals(otherData: UserPersonalData): boolean {
        if (!otherData) return false;
        return this.relationshipStatus.equals(otherData.relationshipStatus) &&
               this.instagramLink.equals(otherData.instagramLink) &&
               this.birthDate.equals(otherData.birthDate) &&
               this.profession.equals(otherData.profession);
    }
}
