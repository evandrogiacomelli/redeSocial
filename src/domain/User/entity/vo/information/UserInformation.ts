import {UserProfileInfo} from "./UserProfileInfo";
import {UserPersonalData} from "./UserPersonalData";
import {UserLocation} from "./UserLocation";
import {UserName} from "../shared/UserName";
import {UserEmail} from "../shared/UserEmail";
import {UserPhoneNumber} from "../shared/UserPhoneNumber";
import {UserRelationship} from "./UserRelationship";
import {UserBirthDate} from "./UserBirthDate";
import {UserProfession} from "./UserProfession";
import {UserZipCode} from "./UserZipCode";
import {UserState} from "./UserState";
import {UserAddress} from "./UserAddress";


export class UserInformation {
    private readonly profileInfo: UserProfileInfo;
    private readonly personalData: UserPersonalData;
    private readonly userLocation: UserLocation;

    private constructor(profileInfo: UserProfileInfo, personalData: UserPersonalData, location: UserLocation) {
        this.profileInfo = profileInfo;
        this.personalData = personalData;
        this.userLocation = location;
    }

    static create(profileInfo: UserProfileInfo, personalData: UserPersonalData, location: UserLocation): UserInformation {
        return new UserInformation(profileInfo, personalData, location);
    }


    public withUpdatedName(name: UserName): UserInformation {
        return new UserInformation(
            this.profileInfo.withName(name),
            this.personalData,
            this.userLocation,
        )
    }

    public withUpdatedEmail(email: UserEmail): UserInformation {
        return new UserInformation(
            this.profileInfo.withEmail(email),
            this.personalData,
            this.userLocation
        )
    }

    public withUpdatedPhoneNumber(phoneNumber: UserPhoneNumber): UserInformation {
        return new UserInformation(
            this.profileInfo.withPhoneNumber(phoneNumber),
            this.personalData,
            this.userLocation,
        )
    }

    public withUpdatedRelationship(relationship: UserRelationship): UserInformation {
        return new UserInformation(
            this.profileInfo,
            this.personalData.withRelationship(relationship),
            this.userLocation,
        )
    }

    public withUpdatedBirthDate(birthdate: UserBirthDate): UserInformation {
        return new UserInformation(
            this.profileInfo,
            this.personalData.withBirthDate(birthdate),
            this.userLocation,
        )
    }

    public withUpdatedProfession(profession: UserProfession): UserInformation {
        return new UserInformation(
            this.profileInfo,
            this.personalData.withProfession(profession),
            this.userLocation,
        )
    }

    public withUpdatedZipCode(zipCode: UserZipCode): UserInformation {
        return new UserInformation(
            this.profileInfo,
            this.personalData,
            this.userLocation.withZipCode(zipCode)
        )
    }

    public withUpdatedState(state: UserState): UserInformation {
        return new UserInformation(
            this.profileInfo,
            this.personalData,
            this.userLocation.withState(state),
        )
    }

    public withUpdatedAddress(address: UserAddress): UserInformation {
        return new UserInformation(
            this.profileInfo,
            this.personalData,
            this.userLocation.withAddress(address),
        )
    }

    public getInfo(): UserProfileInfo{
        return this.profileInfo;
    }

    public getData(): UserPersonalData{
        return this.personalData;
    }

    public getLocation(): UserLocation{
        return this.userLocation;
    }


    public equals(other: UserInformation): boolean {
        if (!other) return false;

        return this.profileInfo.equals(other.profileInfo) &&
            this.personalData.equals(other.personalData) &&
            this.userLocation.equals(other.userLocation);
    }
}
