import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Event} from "@api-interfaces";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class EventService {
    private apiUrl: string;
    eventCollection: AngularFirestoreCollection<Event>;

    constructor(public afs: AngularFirestore, private http: HttpClient) {
        this.eventCollection = this.afs.collection('events');
        this.apiUrl = environment.apiUrl;
    }

    //Function to add a new Event to Firestore
    async createEvent(e: Event) {
        await this.eventCollection.add(e);
    }

    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiUrl}/event`);
    }
}

