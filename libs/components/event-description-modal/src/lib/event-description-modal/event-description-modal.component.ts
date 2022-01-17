import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '@api-interfaces';

/**
 * Event description modal component
 */
@Component({
    selector: 'mate-team-event-description-modal',
    templateUrl: './event-description-modal.component.html',
    styleUrls: ['./event-description-modal.component.scss']
})
export class EventDescriptionModalComponent {
    /**
     * Dismiss modal event
     */
    @Output() dismissModalEvent = new EventEmitter();
    /**
     * Event
     */
    @Input() event: Event = {} as Event;
}
