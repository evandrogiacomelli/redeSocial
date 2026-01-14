import { randomUUID } from "node:crypto";
import { UserCreationData } from "./UserCreationData";
import { UserReconstitutionData } from "./UserReconstitutionData";
import {UserId} from "./vo/UserId";
import {UserInformation} from "./vo/information/UserInformation";
import {UserLocation} from "./vo/information/location/UserLocation";
import {UserName} from "./vo/information/profileInfo/UserName";
import {UserEmail} from "./vo/information/profileInfo/UserEmail";
import {UserPhoneNumber} from "./vo/information/profileInfo/UserPhoneNumber";
import {UserState} from "./vo/information/location/UserState";
import {UserRelationship} from "./vo/information/personalData/UserRelationship";
import {UserBirthDate} from "./vo/information/personalData/UserBirthDate";
import {UserBio} from "./vo/information/personalData/UserBio";
import {UserCountry} from "./vo/information/location/UserCountry";
import {UserCity} from "./vo/information/location/UserCity";
import {UserVisibility} from "./vo/UserVisibility";
import {UserAudit} from "./vo/UserAudit";
import {UserPassHash} from "./vo/UserPassHash";

export class User {
    private readonly userId: UserId;
    private userInfo: UserInformation;
    private active: boolean;
    private visibility: UserVisibility;
    private audit: UserAudit;
    private passwordHash: UserPassHash;

    private constructor(
        id: UserId,
        userInfo: UserInformation,
        active: boolean,
        visibility: UserVisibility,
        audit: UserAudit,
        passwordHash: UserPassHash
    ) {
       this.userId = id;
       this.userInfo = userInfo;
       this.active = active;
       this.visibility = visibility;
       this.audit = audit;
       this.passwordHash = passwordHash;
    }

    static create(
        id: UserId,
        userInfo: UserInformation,
        visibility: UserVisibility,
        passwordHash: UserPassHash
    ): User {
        return new User(id, userInfo, true, visibility, UserAudit.createDefault(), passwordHash);
    }

    static createFromData(data: UserCreationData): User {
        const id: UserId = UserId.create(randomUUID());
        const info: UserInformation = UserInformation.create(
            data.userName,
            data.name,
            data.email,
            data.phone,
            data.relationship,
            data.birth,
            data.bio,
            data.location.country,
            data.location.state,
            data.location.city,
        );
        const visibility: UserVisibility = UserVisibility.create(data.visibility);
        const passwordHash: UserPassHash = UserPassHash.create(data.password);
        return User.create(id, info, visibility, passwordHash);
    }

    static reconstitute(
        id: UserId,
        userInfo: UserInformation,
        active: boolean,
        visibility: UserVisibility,
        audit: UserAudit,
        passwordHash: UserPassHash
    ): User {
       return new User(id, userInfo, active, visibility, audit, passwordHash);
    }

    static reconstituteFromData(data: UserReconstitutionData): User {
        const info: UserInformation = UserInformation.create(
            data.userName,
            data.name,
            data.email,
            data.phone,
            data.relationship,
            data.birth,
            data.bio,
            data.location.country,
            data.location.state,
            data.location.city,
        );
        const audit: UserAudit = UserAudit.create(data.createdAt, data.updatedAt, data.deletedAt);
        const visibility: UserVisibility = UserVisibility.create(data.visibility);
        const passwordHash: UserPassHash = UserPassHash.create(data.passwordHash);

        return User.reconstitute(
            UserId.create(data.id),
            info,
            data.isActive,
            visibility,
            audit,
            passwordHash,
        );
    }


    public getId(): UserId {
       return this.userId;
    }


    public getInfo(): UserInformation{
       return this.userInfo;
    }

    public getVisibility(): UserVisibility {
        return this.visibility;
    }

    public getPasswordHash(): UserPassHash {
        return this.passwordHash;
    }

    public getAudit(): UserAudit {
        return this.audit;
    }

    public getCreatedAt(): Date {
        return this.audit.getCreatedAt();
    }

    public getUpdatedAt(): Date {
        return this.audit.getUpdatedAt();
    }

    public getDeletedAt(): Date | null {
        return this.audit.getDeletedAt();
    }

    public changeName(name: UserName): void {
        if (this.userInfo.getInfo().getName().equals(name)) return;
        this.userInfo = this.userInfo.withUpdatedName(name);
    }

    public changeEmail(email: UserEmail): void {
       if (this.userInfo.getInfo().getEmail().equals(email)) return;
       this.userInfo = this.userInfo.withUpdatedEmail(email);
    }

    public changePhoneNumber(phoneNumber: UserPhoneNumber): void {
        if (this.userInfo.getInfo().getPhoneNumber().equals(phoneNumber)) return;
        this.userInfo = this.userInfo.withUpdatedPhoneNumber(phoneNumber);
    }


    public changeRelationship(relationship: UserRelationship): void {
        if (this.userInfo.getData().getRelationship().equals(relationship)) return;
        this.userInfo = this.userInfo.withUpdatedRelationship(relationship);
    }

    public changeBirthDate(birthDate: UserBirthDate): void {
        const current = this.userInfo.getData().getBirthDate();
        if (current.equals(birthDate)) return;
        this.userInfo = this.userInfo.withUpdatedBirthDate(birthDate);
    }

    public changeBio(bio: UserBio): void {
        if (this.userInfo.getData().getBio().equals(bio)) return;
        this.userInfo = this.userInfo.withUpdatedBio(bio);
    }

    public isActive(): boolean {
        return this.active;
    }

    public changeVisibility(visibility: UserVisibility): void {
        if (this.visibility.equals(visibility)) return;
        this.visibility = visibility;
    }

    public changePassword(passwordHash: UserPassHash): void {
        if (this.passwordHash.equals(passwordHash)) return;
        this.passwordHash = passwordHash;
    }

    public verifyPassword(passwordHash: UserPassHash): boolean {
        return this.passwordHash.equals(passwordHash);
    }

    public inactivate(reason?: string): void {
        if (!this.active) return;
        this.active = false;
    }

    public reactivate(): void {
        if (this.active) return;
        this.active = true;
    }


    public getUserLocation(): UserLocation {
        return this.userInfo.getLocation();
    }

    public changeUserCountry(country: UserCountry): void {
       if (this.getUserLocation().getCountry().equals(country)) return;
       this.userInfo = this.userInfo.withUpdatedCountry(country);
    }

    public changeUserState(state: UserState): void {
       if (this.getUserLocation().getState().equals(state)) return;
       this.userInfo = this.userInfo.withUpdatedState(state);
    }

    public changeUserCity(city: UserCity): void {
       if (this.getUserLocation().getCity().equals(city)) return;
       this.userInfo = this.userInfo.withUpdatedCity(city);
    }
}
