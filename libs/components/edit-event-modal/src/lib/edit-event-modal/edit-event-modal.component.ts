import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '@api-interfaces';

@Component({
    selector: 'mate-team-edit-event-modal',
    templateUrl: './edit-event-modal.component.html',
    styleUrls: ['./edit-event-modal.component.scss']
})
export class EditEventModalComponent {
    @Output() dismissModalEvent = new EventEmitter();
    @Input() event: Event = {} as Event;
}
