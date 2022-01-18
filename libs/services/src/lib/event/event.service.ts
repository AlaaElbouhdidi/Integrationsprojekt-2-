import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Event, Team } from '@api-interfaces';
import { GroupService } from '../group/group.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

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
     * @param authService {AuthService}
     */
    constructor(
        private afs: AngularFirestore,
        private groupService: GroupService,
        private authService: AuthService
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
    getUpcomingEvents(): Observable<Event[]> {
        const { uid } = this.authService.getCurrentUser();
        const participant = {
            displayName: '',
            icon: '',
            uid
        };
        return this.afs
            .collection<Event>('events', (ref) =>
                ref
                    .where('participants', 'array-contains', participant)
                    .where('done', '==', false)
                    .limit(5)
            )
            .valueChanges();
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
     * Get teams of a specified event
     *
     * @param eventID {string | undefined} ID of event
     * @returns {Observable<Team[]>} Observable containing array of teams
     */
    getTeamsOfEvent(eventID: string | undefined): Observable<Team[]> {
        return this.afs
            .collection<Event>('events/' + eventID + '/teams')
            .valueChanges({ idField: 'id' });
    }

    /**
     * Sets winningTeam of a specified event
     *
     * @param eventID {string | undefined} ID of event
     * @param teamName {string} Name of winning team to be set
     */
    setWinningTeam(
        eventID: string | undefined,
        teamName: string
    ): Promise<void> {
        return this.afs
            .collection<Event>('events')
            .doc(eventID)
            .update({ winnerTeam: teamName });
    }

    /**
     * Create an event
     *
     * @param event {Event} The event to create
     */
    async createEvent(event: Event): Promise<void> {
        await this.afs.collection<Event>('events').add(event);
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
