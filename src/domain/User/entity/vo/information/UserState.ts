import {UserZipCode} from "./UserZipCode";


export class UserState {
    private readonly state: string;

    private constructor(state: string) {
        this.state = state;
    }

    public static create(state: string): UserState {
        const validatedState: string = this.validateState(state);
        return new UserState(validatedState);
    }

    private static validateState(state: string): string {
        if (!state) throw new Error("State must not be empty");
        const trimmedState = state.trim();

        const validState = [
            "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT",
            "MS","MG","PA","PB","PR","PE","PI","RJ","RN","RO","RS",
            "RR","SC","SP","SE","TO"
        ];
        const stateToUpper = trimmedState.toUpperCase();
        if (!validState.includes(stateToUpper)) throw new Error("Invalid state");

        return stateToUpper;
    }


    public getValue(): string {
        return this.state;
    }

    public toString(): string {
        return `User State: ${this.state}`;
    }

    public equals(otherState: UserState): boolean {
        if (!otherState) return false;
        return this.state === otherState.state;
    }
}