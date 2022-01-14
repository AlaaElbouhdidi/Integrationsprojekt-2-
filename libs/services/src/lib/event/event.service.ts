import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Event } from '@api-interfaces';
import { GroupService } from '../group/group.service';
import { Observable } from 'rxjs';

/**
 * Event service
 */
@Injectable({
    providedIn: 'root'
})
export class EventService {
    /**
     * Constructor of event service
     * @param afs {AngularFirestore}
     * @param groupService {GroupService}
     */
    constructor(
        private afs: AngularFirestore,
        private groupService: GroupService
    ) {}

    /**
     * Remove id from an event
     *
     * @param event {Event} Event to prepare for saving
     * @returns {Event} Event without id
     * @private
     */
    private static copyAndPrepare(event: Event): Event {
        const copy = { ...event };
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
            .collection<Event>('events', (ref) =>
                ref
                    .where('groupID', '==', this.groupService.currentGroupId)
                    .where('done', '==', false)
            )
            .valueChanges({ idField: 'id' });
    }

    /**
     * Get all active events of a group
     *
     * @returns {Observable<Event[]>} Observable containing array of events
     */
    getDoneEventsOfGroup(): Observable<Event[]> {
        return this.afs
            .collection<Event>('events', (ref) =>
                ref
                    .where('groupID', '==', this.groupService.currentGroupId)
                    .where('done', '==', true)
            )
            .valueChanges({ idField: 'id' });
    }

    /**
     * Create an event
     *
     * @param event {Event} The event to create
     */
    async createEvent(event: Event): Promise<void> {
        await this.afs
            .collection<Event>('events')
            .add(event)
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
        return this.afs.collection<Event>('events').doc(eventId).delete();
    }
}
