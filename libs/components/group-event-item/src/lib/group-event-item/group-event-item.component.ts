import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Event, Participant } from '@api-interfaces';
import { AuthService } from '@services';

@Component({
    selector: 'mate-team-group-event-item',
    templateUrl: './group-event-item.component.html',
    styleUrls: ['./group-event-item.component.scss']
})
export class GroupEventItemComponent implements OnChanges {
    @Output() participateEvent = new EventEmitter<Event>();
    @Output() deleteEvent = new EventEmitter<string>();
    @Output() descriptionEvent = new EventEmitter<Event>();
    @Input() event: Event = {} as Event;
    @Input() isAdmin = false;
    participating = false;

    constructor(
        private authService: AuthService
    ) { }

    checkIfParticipant(): boolean {
        const userId = this.authService.getCurrentUser().uid;
        const participant = this.event.participants.find(participant => participant.uid === userId);
        return !!participant;
    }

    showDescription(): void {
        this.descriptionEvent.emit(this.event);
    }

    participate(): void {
        if (this.checkIfParticipant()) {
            return;
        }
        const user = this.authService.getCurrentUser();
        const participant: Participant = {
            uid: user.uid,
            displayName: user.displayName ? user.displayName : 'No name',
            icon: user.photoURL ? user.photoURL : 'No icon'
        }
        this.event.participants.push(participant);
        this.participateEvent.emit(this.event);
    }

    delete(): void {
        this.deleteEvent.emit(this.event.id);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.event) {
            this.participating = this.checkIfParticipant();
        }
    }
}
