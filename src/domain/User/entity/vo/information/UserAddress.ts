

export class UserAddress {
    private readonly country: string;
    private readonly city: string;
    private readonly district: string;
    private readonly street: string;
    private readonly streetNumber: number;
    private readonly reference: string

    private constructor(country: string, city: string, district: string, street: string, streetNumber: number, reference: string) {
        this.country = country;
        this.city = city;
        this.district = district;
        this.street = street;
        this.streetNumber = streetNumber;
        this.reference = reference;
    }

    public static create(country: string, city: string, district: string, street: string, streetNumber: number, reference: string): UserAddress {
        const validatedCountry: string = this.validateCountry(country);
        const validatedCity: string = this.validateCity(city);
        const validatedDistrict: string = this.validateDistrict(district);
        const validatedStreet: string = this.validateStreet(street);
        const validatedStreetNumber: number = this.validateStreetNumber(streetNumber);
        const validatedReference: string = this.validateReference(reference);

        return new UserAddress(validatedCountry, validatedCity, validatedDistrict, validatedStreet, validatedStreetNumber, validatedReference);

    }

    private static validateCountry(country: string): string {
        if (!country) throw new Error("Country must not be empty");

        const trimmedCountry = country.trim().toUpperCase();
        if (trimmedCountry.length < 2) throw new Error("Country is invalid");

        return trimmedCountry;
    }

    private static validateCity(city: string): string {
        if (!city) throw new Error("City must not be empty");

        const trimmedCity = city.trim();
        if (trimmedCity.length < 2) throw new Error("City is invalid");

        return trimmedCity;
    }

    private static validateStreet(street: string): string {
        if (!street) throw new Error("Street must not be empty");

        const trimmedStreet = street.trim();
        if (trimmedStreet.length < 3) throw new Error("Street is invalid");

        return trimmedStreet;
    }

    private static validateDistrict(district: string): string {
        if (!district) throw new Error("District must not be empty");

        const trimmedDistrict = district.trim();
        if (trimmedDistrict.length < 2) throw new Error("District is invalid");

        return trimmedDistrict;
    }

    private static validateStreetNumber(streetNumber: number): number {
        if (streetNumber === null || streetNumber === undefined) throw new Error("Street number must be provided");
        if (!Number.isInteger(streetNumber) || streetNumber <= 0) throw new Error("Street number must be a positive integer");

        return streetNumber;
    }

    private static validateReference(reference: string): string {
        if (!reference) throw new Error("Reference must not be empty");

        const trimmedReference = reference.trim();
        if (trimmedReference.length < 2) throw new Error("Reference is invalid");
        if (trimmedReference.length > 50) throw new Error("Reference is too large");

        return trimmedReference;
    }


    public withCountry(country: string): UserAddress {
        return new UserAddress(
            UserAddress.validateCountry(country),
            this.city,
            this.district,
            this.street,
            this.streetNumber,
            this.reference,
        )
    }

    public withCity(city: string): UserAddress {
        return new UserAddress(
            this.country,
            UserAddress.validateCity(city),
            this.district,
            this.street,
            this.streetNumber,
            this.reference,
        )
    }

    public withDistrict(district: string): UserAddress {
        return new UserAddress(
            this.country,
            this.city,
            UserAddress.validateDistrict(district),
            this.street,
            this.streetNumber,
            this.reference,
        )
    }

    public withStreet(street: string): UserAddress {
        return new UserAddress(
            this.country,
            this.city,
            this.district,
            UserAddress.validateStreet(street),
            this.streetNumber,
            this.reference,
        )
    }

    public withStreetNumber(streetNumber: number): UserAddress {
        return new UserAddress(
            this.country,
            this.city,
            this.district,
            this.street,
            UserAddress.validateStreetNumber(streetNumber),
            this.reference,
        )
    }

    public withReference(reference: string): UserAddress {
        return new UserAddress(
            this.country,
            this.city,
            this.district,
            this.street,
            this.streetNumber,
            UserAddress.validateReference(reference),
        )
    }


    public getCountry(): string {
        return this.country;
    }

    public getCity(): string {
        return this.city;
    }

    public getDistrict(): string {
        return this.district;
    }

    public getStreet(): string {
        return this.street;
    }

    public getStreetNumber(): number {
        return this.streetNumber;
    }

    public getReference(): string {
        return this.reference;
    }

    public toString(): string {
        return ` User Address {
        country = ${this.country.toString()}
        city = ${this.city.toString()}
        district = ${this.district.toString()}
        street = ${this.street.toString()}
        street number = ${this.streetNumber.toString()}
        reference = ${this.reference.toString()}
        }`;
    }

    public equals(otherAddress: UserAddress): boolean {
        if (!otherAddress) return false;
        return this.country === otherAddress.country &&
        this.city === otherAddress.city &&
        this.district === otherAddress.district &&
        this.street === otherAddress.street &&
        this.streetNumber === otherAddress.streetNumber &&
        this.reference === otherAddress.reference;
    }
}