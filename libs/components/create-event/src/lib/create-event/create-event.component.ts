import { Component } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Event} from "@api-interfaces";

@Component({
    selector: 'mate-team-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
    public event = {
        name: '',
        description: '',
        date: ''
    };
    eventCollection: AngularFirestoreCollection<Event>;

    constructor(public afs: AngularFirestore) {
        this.eventCollection = this.afs.collection('events');
    }

    //Function to add a new Event to Firestore
    async createEvent() {
        await this.eventCollection.add(this.event);
    }
}
