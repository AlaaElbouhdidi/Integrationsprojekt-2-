export interface Message {
    message: string;
    author?: string;
}
export interface Alert {
    type: 'error' | 'success' | 'neutral' | 'warn';
    message: string;
}

export interface Environment {
    firebase: {
        projectId: string;
        appId: string;
        storageBucket: string;
        apiKey: string;
        authDomain: string;
        messagingSenderId: string;
    };
    production: boolean;
    apiUrl: string;
}

export class Group {
    imgSrc = '';
    title = '';
    numberOfNotSeenMessages = 0;
    latestMessage: Message | undefined;
    members: string[] = [];
    creationDate: Date | undefined;
}
export class Address {
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

export class Event {
    description = '';
    title = '';
    address: Address | null = null;
    date: Date = new Date();

    constructor(
        description: string,
        title: string,
        address: Address | null,
        date: Date
    ) {
        this.description = description;
        this.title = title;
        this.address = address;
        this.date = date;
    }
    static empty(): Event {
        return new Event('', '', null, new Date());
    }
}
