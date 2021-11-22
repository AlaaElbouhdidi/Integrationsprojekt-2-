import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Event } from '@api-interfaces';
//import {AddressModel} from "../models/AddressModel";
//import {GroupModel} from "../models/GroupModel";
// import { HttpClient } from '@angular/common/http';
import { events } from './mock-events';

@Injectable({
    providedIn: 'root',
})
export class EventService {
    getEvents(): Observable<Event[]> {
        // return this.httpClient.get<EventModel[]>(this.url);
        return of(events);
    }
}
