import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Event } from '@api-interfaces';
import { GroupService } from '../group/group.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    constructor(
        private afs: AngularFirestore,
        private groupService: GroupService
    ) { }

    private static copyAndPrepare(event: Event): Event {
        const copy = {...event};
        delete copy.id;
        return copy;
    }

    getActiveEventsOfGroup(): Observable<Event[]> {
        return this.afs
            .collection<Event>(
                'events', ref => ref
                    .where('groupID', '==', this.groupService.currentGroupId)
                    .where('done', '==', false)
            )
            .valueChanges({ idField: 'id' });
    }

    updateEvent(eventId: string, event: Event): Promise<void> {
        return this.afs
            .collection<Event>('events')
            .doc(eventId)
            .update(EventService.copyAndPrepare(event));
    }

    deleteEvent(eventId: string): Promise<void> {
        return this.afs
            .collection<Event>('events')
            .doc(eventId)
            .delete();
    }
}
