import { Component, EventEmitter, Output } from '@angular/core';
import { CreateEventFormData } from '@api-interfaces';

/**
 * Create event modal component
 */
@Component({
    selector: 'mate-team-create-event-modal',
    templateUrl: './create-event-modal.component.html',
    styleUrls: ['./create-event-modal.component.scss']
})
export class CreateEventModalComponent {
    /**
     * Dismiss modal event
     */
    @Output() dismissModalEvent = new EventEmitter();
    /**
     * Create event event
     */
    @Output() createEventEvent = new EventEmitter<CreateEventFormData>();
}
