import {Component} from '@angular/core';
import {EventService} from "../../../../../services/src/lib/event/event.service";

@Component({
    selector: 'mate-team-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
    public event = {
        name: '',
        description: '',
        date: '',
    };

    constructor(private eventService: EventService) {
    }

    createEvent() {
        this.eventService.createEvent(this.event);
    }



    /**
     * Get all groups of currently logged in user.

    async findAllUserGroups(): Promise<Group[]> {
        console.log('Get all groups');
        const snapshot = await this.afs
            .collection<User>('users')
            .doc(this.userService.user?.uid)
            .collection<Group>('group')
            .get()
            .toPromise()
        return snapshot.docs.map(doc => {
            const group = doc.data();
            console.log('Group: ' + group);
            group.id = doc.id;
            return group;
        });
    }
     */
}
