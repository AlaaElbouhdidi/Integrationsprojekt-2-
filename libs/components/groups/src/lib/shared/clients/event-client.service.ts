import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {Observable} from "rxjs";
import {EventModel} from '../models/EventModel';
import {AddressModel} from "../models/AddressModel";
import {GroupModel} from "../models/GroupModel";
import {HttpClient} from "@angular/common/http";
import { MockData } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class EventClientService {
    url = 'http://localhost:3001/events';

  constructor(private httpClient: HttpClient) { }
    getEvents(): Observable<EventModel[]> {
        // return this.httpClient.get<EventModel[]>(this.url);
        return of(MockData.events);
    }
}
