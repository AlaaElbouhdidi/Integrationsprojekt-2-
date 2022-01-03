import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Event} from "@api-interfaces";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { GroupService } from '../group/group.service';

/**
 * Event service
 */
@Injectable({
  providedIn: 'root'
})
export class EventService {
    private apiUrl: string;
    eventCollection: AngularFirestoreCollection<Event>;

    /**
     * Constructor of event service
     * @param afs {AngularFirestore}
     * @param http
     * @param groupService {GroupService}
     */
    constructor(public afs: AngularFirestore, private http: HttpClient, private groupService: GroupService) {
        this.eventCollection = this.afs.collection('events');
        this.apiUrl = environment.apiUrl;
    }

    /**
     * Remove id from an event
     *
     * @param event {Event} Event to prepare for saving
     * @returns {Event} Event without id
     * @private
     */
    private static copyAndPrepare(event: Event): Event {
        const copy = {...event};
        delete copy.id;
        return copy;
    }

    /**
     * Get all active events of a group
     *
     * @returns {Observable<Event[]>} Observable containing array of events
     */
    getActiveEventsOfGroup(): Observable<Event[]> {
        return this.afs
            .collection<Event>(
                'events', ref => ref
                    .where('groupID', '==', this.groupService.currentGroupId)
                    .where('done', '==', false)
            )
            .valueChanges({ idField: 'id' });
    }

    //Function to add a new Event to Firestore
    async createEvent(e: Event) {
        await this.eventCollection.add(e);
    }

    /**
     * Update an event
     *
     * @param eventId {string} The id of the event to update
     * @param event {Event} The event data to update
     */
    updateEvent(eventId: string, event: Event): Promise<void> {
        return this.afs
            .collection<Event>('events')
            .doc(eventId)
            .update(EventService.copyAndPrepare(event));
    }

    /**
     * Delete an event
     *
     * @param eventId {string} The id of the event to delete
     */
    deleteEvent(eventId: string): Promise<void> {
        return this.afs
            .collection<Event>('events')
            .doc(eventId)
            .delete();
    }
}

