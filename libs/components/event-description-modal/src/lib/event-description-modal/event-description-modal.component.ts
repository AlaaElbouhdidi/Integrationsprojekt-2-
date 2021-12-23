import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '@api-interfaces';

@Component({
    selector: 'mate-team-event-description-modal',
    templateUrl: './event-description-modal.component.html',
    styleUrls: ['./event-description-modal.component.scss']
})
export class EventDescriptionModalComponent {
    @Output() dismissModalEvent = new EventEmitter();
    @Input() event: Event = {} as Event;
}
