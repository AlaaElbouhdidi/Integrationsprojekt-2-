import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Event, Group} from "@api-interfaces";
// import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Event } from '@api-interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

    eventCollection: AngularFirestoreCollection<Event>;
    myGroupsCollection: AngularFirestoreCollection<Group>;

    constructor(public afs: AngularFirestore, private http: HttpClient) {
        this.eventCollection = this.afs.collection('events');
        this.myGroupsCollection = this.afs.collection('group');
        this.apiUrl = environment.apiUrl;
    }

    //Function to add a new Event to Firestore
    async createEvent(e: Event) {
        await this.eventCollection.add(e);
    }

    private apiUrl: string;

    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiUrl}/event`).pipe(
            map((x) => {
                return x.map((z) => {
                    return {
                        id: z.id,
                        name: z.name,
                        description: z.description,
                        date: z.date
                    };
                });
            })
        );
    }
}

