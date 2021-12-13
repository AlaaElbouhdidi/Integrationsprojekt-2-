import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Event, Group} from "@api-interfaces";

@Injectable({
  providedIn: 'root'
})
export class EventService {

    eventCollection: AngularFirestoreCollection<Event>;
    myGroupsCollection: AngularFirestoreCollection<Group>;

    constructor(public afs: AngularFirestore) {
        this.eventCollection = this.afs.collection('events');
        this.myGroupsCollection = this.afs.collection('group');

    }

    //Function to add a new Event to Firestore
    async createEvent(e: Event) {
        await this.eventCollection.add(e);
    }
}
