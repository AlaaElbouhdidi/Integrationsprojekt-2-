import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '@api-interfaces';

/**
 * Edit event modal component
 */
@Component({
    selector: 'mate-team-edit-event-modal',
    templateUrl: './edit-event-modal.component.html',
    styleUrls: ['./edit-event-modal.component.scss']
})
export class EditEventModalComponent {
    /**
     * Dismiss modal event
     */
    @Output() dismissModalEvent = new EventEmitter();
    /**
     * Update event
     */
    @Output() updateEvent = new EventEmitter<Event>();
    /**
     * Event
     */
    @Input() event: Event = {} as Event;
}
