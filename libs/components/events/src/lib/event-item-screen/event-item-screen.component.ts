import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '@api-interfaces';

@Component({
    selector: 'mate-team-event-item-screen',
    templateUrl: './event-item-screen.component.html',
    styleUrls: ['./event-item-screen.component.scss']
})
export class EventItemScreenComponent {
    /**
     * This is called, iff the user clicks on more information.
     */
    @Output()
    clicked: EventEmitter<void> = new EventEmitter<void>();
    /**
     * Event, that is displayed.
     */
    @Input()
    event: Event | undefined;
}
