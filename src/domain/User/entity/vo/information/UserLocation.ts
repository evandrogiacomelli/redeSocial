import {UserAddress} from "./UserAddress";
import {UserZipCode} from "./UserZipCode";
import {UserState} from "./UserState";


export class UserLocation {
    private readonly zipCode: UserZipCode;
    private readonly state: UserState;
    private readonly address: UserAddress;

    private constructor(zipCode: UserZipCode, state: UserState, address: UserAddress) {
        this.zipCode = zipCode;
        this.state = state;
        this.address = address;
    }

    static create(zipCode: UserZipCode, state: UserState, address: UserAddress): UserLocation {
        return new UserLocation(zipCode, state, address);
    }


    public withZipCode(zipCode: UserZipCode): UserLocation {
        return new UserLocation(
            zipCode,
            this.state,
            this.address,
        )
    }

    public withState(state: UserState): UserLocation {
        return new UserLocation(
            this.zipCode,
            state,
            this.address,
        )
    }

    public withAddress(address: UserAddress): UserLocation {
        return new UserLocation(
            this.zipCode,
            this.state,
            address,
        )
    }


    public getZipCode(): UserZipCode {
        return this.zipCode;
    }

    public getState(): UserState {
        return this.state;
    }

    public getAddress(): UserAddress {
        return this.address;
    }

    public toString(): string {
        return `UserLocation {
        zipCode: ${this.zipCode.toString()},
        state: ${this.state.toString()},
        address: ${this.address.toString()}
    }`;
    }

    public equals(other: UserLocation): boolean {
        if (!other) return false;

        return this.zipCode.equals(other.zipCode) &&
            this.state.equals(other.state) &&
            this.address.equals(other.address);
    }

}