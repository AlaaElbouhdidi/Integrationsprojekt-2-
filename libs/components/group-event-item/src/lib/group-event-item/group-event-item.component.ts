import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from '@angular/core';
import { Event, Participant } from '@api-interfaces';
import { AuthService } from '@services';

/**
 * Group event item component
 */
@Component({
    selector: 'mate-team-group-event-item',
    templateUrl: './group-event-item.component.html',
    styleUrls: ['./group-event-item.component.scss']
})
export class GroupEventItemComponent implements OnChanges {
    /**
     * Participate event
     */
    @Output() participateEvent = new EventEmitter<Event>();
    /**
     * Team event
     */
    @Output() teamEvent = new EventEmitter<Event>();
    /**
     * Delete event
     */
    @Output() deleteEvent = new EventEmitter<string>();
    /**
     * Description event
     */
    @Output() descriptionEvent = new EventEmitter<Event>();
    /**
     * Event
     */
    @Input() event: Event = {} as Event;
    /**
     * Determines if a user is admin
     */
    @Input() isAdmin = false;
    /**
     * Determines if a user participates an event
     */
    participating = false;

    /**
     * Constructor of group event item
     * @param authService {AuthService}
     */
    constructor(private authService: AuthService) {}

    /**
     * Check if a user participates an event
     *
     * @returns {boolean} Indicates if user participates or not
     */
    checkIfParticipant(): boolean {
        const userId = this.authService.getCurrentUser().uid;
        const participant = this.event.participants.find(
            (participant) => participant.uid === userId
        );
        return !!participant;
    }

    /**
     * Emit description event to show description modal
     */
    showDescription(): void {
        this.descriptionEvent.emit(this.event);
    }

    /**
     * Emit team event
     */
    showTeams(): void {
        this.teamEvent.emit(this.event);
    }

    /**
     * Adds user to participants and emits participate event to parent component with event data
     */
    participate(): void {
        if (this.checkIfParticipant()) {
            return;
        }
        const user = this.authService.getCurrentUser();
        const participant: Participant = {
            uid: user.uid,
            displayName: user.displayName ? user.displayName : 'No name',
            icon: user.photoURL ? user.photoURL : 'No icon'
        };
        this.event.participants.push(participant);
        this.participateEvent.emit(this.event);
    }

    /**
     * Emit delete event to parent component with the event id
     */
    delete(): void {
        this.deleteEvent.emit(this.event.id);
    }

    /**
     * Check if a user participates an event if the event input changes
     *
     * @param changes {SimpleChanges} The changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.event) {
            this.participating = this.checkIfParticipant();
        }
    }
}
