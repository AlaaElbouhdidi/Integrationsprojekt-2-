import { Component, EventEmitter, Output } from '@angular/core';
import { CreateEventFormData } from '@api-interfaces';

@Component({
    selector: 'mate-team-create-event-modal',
    templateUrl: './create-event-modal.component.html',
    styleUrls: ['./create-event-modal.component.scss']
})
export class CreateEventModalComponent {
    @Output() dismissModalEvent = new EventEmitter();
    @Output() createEventEvent = new EventEmitter<CreateEventFormData>();
}
