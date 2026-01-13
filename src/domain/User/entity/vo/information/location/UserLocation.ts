import {UserCity} from "./UserCity";
import {UserState} from "./UserState";
import {UserCountry} from "./UserCountry";


export class UserLocation {
    private readonly country: UserCountry;
    private readonly state: UserState;
    private readonly city: UserCity;

    private constructor(country: UserCountry, state: UserState, city: UserCity) {
        this.country = country;
        this.state = state;
        this.city = city;
    }

    static create(country: UserCountry, state: UserState, city: UserCity): UserLocation {
        return new UserLocation(country, state, city);
    }


    public withCountry(country: UserCountry): UserLocation {
        return new UserLocation(
            country,
            this.state,
            this.city,
        )
    }

    public withState(state: UserState): UserLocation {
        return new UserLocation(
            this.country,
            state,
            this.city,
        )
    }

    public withCity(city: UserCity): UserLocation {
        return new UserLocation(
            this.country,
            this.state,
            city,
        )
    }

    public getCountry(): UserCountry {
        return this.country;
    }

    public getState(): UserState {
        return this.state;
    }

    public getCity(): UserCity {
        return this.city;
    }

    public toString(): string {
        return `UserLocation {
        country: ${this.country.toString()},
        state: ${this.state.toString()},
        city: ${this.city.toString()}
    }`;
    }

    public equals(other: UserLocation): boolean {
        if (!other) return false;

        return this.country.equals(other.country) &&
            this.state.equals(other.state) &&
            this.city.equals(other.city);
    }

}