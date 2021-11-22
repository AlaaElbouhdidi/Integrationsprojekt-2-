import { Component, Input } from '@angular/core';
import { Event } from '@api-interfaces';

@Component({
    selector: 'mate-team-event-item-mobile',
    templateUrl: './event-item-mobile.component.html',
    styleUrls: ['./event-item-mobile.component.scss'],
})
export class EventItemMobileComponent {
    @Input()
    event: Event = Event.empty();
}

