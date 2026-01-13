import {UserId} from "./UserId";
import {UserInformation} from "./vo/information/UserInformation";
import {UserLocation} from "./vo/information/UserLocation";
import {UserName} from "./vo/shared/UserName";
import {UserEmail} from "./vo/shared/UserEmail";
import {UserPhoneNumber} from "./vo/shared/UserPhoneNumber";
import {UserZipCode} from "./vo/information/UserZipCode";
import {UserState} from "./vo/information/UserState";
import {UserAddress} from "./vo/information/UserAddress";
import {UserRelationship} from "./vo/information/UserRelationship";
import {UserBirthDate} from "./vo/information/UserBirthDate";
import {UserProfession} from "./vo/information/UserProfession";

export class User {
    private readonly userId: UserId;
    private userInfo: UserInformation;
    private active: boolean;

    private constructor(id: UserId, userInfo: UserInformation, active: boolean) {
       this.userId = id;
       this.userInfo = userInfo;
       this.active = active;
    }

    static create(id: UserId, userInfo: UserInformation): User {
        return new User(id, userInfo, true);
    }

    static reconstitute(id: UserId, userInfo: UserInformation, active: boolean): User {
       return new User(id, userInfo, active);
    }


    public getId(): UserId {
       return this.userId;
    }


    public getInfo(): UserInformation{
       return this.userInfo;
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
        if (current.getTime() === birthDate.getValue().getTime()) return;
        this.userInfo = this.userInfo.withUpdatedBirthDate(birthDate);
    }

    public changeProfession(profession: UserProfession): void {
        if (this.userInfo.getData().getProfession() === profession.getValue()) return;
        this.userInfo = this.userInfo.withUpdatedProfession(profession);
    }

    public isActive(): boolean {
        return this.active;
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

    public changeZipCode(zipCode: UserZipCode): void {
       if (this.getUserLocation().getZipCode().equals(zipCode)) return;
       this.userInfo = this.userInfo.withUpdatedZipCode(zipCode);
    }

    public changeUserState(state: UserState): void {
       if (this.getUserLocation().getState().equals(state)) return;
       this.userInfo = this.userInfo.withUpdatedState(state);
    }

    public changeUserAddress(address: UserAddress): void {
       if (this.getUserLocation().getAddress().equals(address)) return;
       this.userInfo = this.userInfo.withUpdatedAddress(address);
    }

}
