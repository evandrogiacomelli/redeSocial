import {UserProfileInfo} from "./profileInfo/UserProfileInfo";
import {UserPersonalData} from "./personalData/UserPersonalData";
import {UserLocation} from "./location/UserLocation";
import {UserName} from "./profileInfo/UserName";
import {UserEmail} from "./profileInfo/UserEmail";
import {UserPhoneNumber} from "./profileInfo/UserPhoneNumber";
import {UserRelationship} from "./personalData/UserRelationship";
import {UserBirthDate} from "./personalData/UserBirthDate";
import {UserBio} from "./personalData/UserBio";
import {UserState} from "./location/UserState";
import {UserCountry} from "./location/UserCountry";
import {UserCity} from "./location/UserCity";


export class UserInformation {
    private readonly profileInfo: UserProfileInfo;
    private readonly personalData: UserPersonalData;
    private readonly userLocation: UserLocation;

    private constructor(profileInfo: UserProfileInfo, personalData: UserPersonalData, location: UserLocation) {
        this.profileInfo = profileInfo;
        this.personalData = personalData;
        this.userLocation = location;
    }

    static create(
        username: string,
        name: string,
        email: string,
        phoneNumber: string,
        relationship: string,
        birthDate: Date,
        bio: string,
        country: string,
        state: string,
        city: string,
    ): UserInformation {
        const profileInfo: UserProfileInfo = UserProfileInfo.create(username, name, email, phoneNumber);
        const personalData: UserPersonalData = UserPersonalData.create(relationship, birthDate, bio);
        const location: UserLocation = UserLocation.create(country, state, city);
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

    public withUpdatedBio(bio: UserBio): UserInformation {
        return new UserInformation(
            this.profileInfo,
            this.personalData.withBio(bio),
            this.userLocation,
        )
    }

    public withUpdatedCountry(country: UserCountry): UserInformation {
        return new UserInformation(
            this.profileInfo,
            this.personalData,
            this.userLocation.withCountry(country)
        )
    }

    public withUpdatedState(state: UserState): UserInformation {
        return new UserInformation(
            this.profileInfo,
            this.personalData,
            this.userLocation.withState(state),
        )
    }

    public withUpdatedCity(city: UserCity): UserInformation {
        return new UserInformation(
            this.profileInfo,
            this.personalData,
            this.userLocation.withCity(city),
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
