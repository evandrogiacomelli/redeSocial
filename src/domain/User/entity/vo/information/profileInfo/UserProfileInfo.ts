import {UserEmail} from "./UserEmail";
import {UserName} from "./UserName";
import {UserPhoneNumber} from "./UserPhoneNumber";
import {UserUsername} from "./UserUsername";


export class UserProfileInfo {
    private readonly username: UserUsername;
    private readonly name: UserName;
    private readonly email: UserEmail;
    private readonly phoneNumber: UserPhoneNumber;

    private constructor(
        username: UserUsername,
        name: UserName,
        email: UserEmail,
        phoneNumber: UserPhoneNumber,
    ) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    static create(username: string, name: string, email: string, phoneNumber: string): UserProfileInfo {
        const validatedUsername: UserUsername = UserUsername.create(username);
        const validatedName: UserName = UserName.create(name);
        const validatedEmail: UserEmail = UserEmail.create(email);
        const validatedPhone: UserPhoneNumber = UserPhoneNumber.create(phoneNumber);
        return new UserProfileInfo(
            validatedUsername,
            validatedName,
            validatedEmail,
            validatedPhone,
        );
    }


    public withName(name: UserName): UserProfileInfo {
        return new UserProfileInfo(
            this.username,
            name,
            this.email,
            this.phoneNumber,
        )
    }

    public withEmail(email: UserEmail): UserProfileInfo {
        return new UserProfileInfo(
            this.username,
            this.name,
            email,
            this.phoneNumber,
        )
    }

    public withPhoneNumber(phoneNumber: UserPhoneNumber): UserProfileInfo {
        return new UserProfileInfo(
            this.username,
            this.name,
            this.email,
            phoneNumber,
        )
    }

    public getUsername(): UserUsername {
        return this.username;
    }

    public getName(): UserName {
        return this.name;
    }

    public getEmail(): UserEmail {
        return this.email;
    }

    public getPhoneNumber(): UserPhoneNumber {
        return this.phoneNumber;
    }


    public toString(): string {
        return `UserProfileInfo {
        username: ${this.username.getValue()},
        name: ${this.name.toString()},
        email: ${this.email.toString()},
        phone: ${this.phoneNumber.toString()},
    }`;
    }

    public equals(other: UserProfileInfo): boolean {
        if (!other) return false;

        return this.username.equals(other.username) &&
            this.name.equals(other.name) &&
            this.email.equals(other.email) &&
            this.phoneNumber.equals(other.phoneNumber)
    }
}
