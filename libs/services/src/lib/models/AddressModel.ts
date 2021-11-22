export class AddressModel {
    zipCode = '';
    region = '';
    streetName = '';
    streetNumber = 0;

    constructor(
        zipCode: string,
        region: string,
        streetName: string,
        streetNumber: number
    ) {
        this.zipCode = zipCode;
        this.region = region;
        this.streetName = streetName;
        this.streetNumber = streetNumber;
    }
}
