import {UserId} from "./UserId";
import {UserInformation} from "./vo/information/UserInformation";
import {UserLocation} from "./vo/information/UserLocation";
import {UserName} from "./vo/shared/UserName";
import {UserEmail} from "./vo/shared/UserEmail";
import {UserPhoneNumber} from "./vo/shared/UserPhoneNumber";
import {UserState} from "./vo/information/UserState";
import {UserRelationship} from "./vo/information/UserRelationship";
import {UserBirthDate} from "./vo/information/UserBirthDate";
import {UserBio} from "./vo/information/UserBio";
import {UserCountry} from "./vo/information/UserCountry";
import {UserCity} from "./vo/information/UserCity";

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

    public changeBio(bio: UserBio): void {
        if (this.userInfo.getData().getBio() === bio.getValue()) return;
        this.userInfo = this.userInfo.withUpdatedBio(bio);
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
