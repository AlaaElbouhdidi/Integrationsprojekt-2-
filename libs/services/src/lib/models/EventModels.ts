import {AddressModel} from "./AddressModel";

export class EventModel {
    description: string;
    title: string ;
    address: AddressModel | null = null;
    date: Date = new Date();

    constructor(description: string, title: string, address: AddressModel | null, date: Date) {
        this.description = description;
        this.title = title;
        this.address = address;
        this.date = date;
    }
    static empty(): EventModel{
        return new EventModel('', '', null, new Date());
    }
}
