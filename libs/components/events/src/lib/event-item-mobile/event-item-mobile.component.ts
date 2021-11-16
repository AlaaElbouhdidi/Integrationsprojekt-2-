import {Component, Input, OnInit} from '@angular/core';
import {EventModel} from '../shared/models/EventModel';

@Component({
    selector: 'mate-team-integrationsprojekt2-event-item-mobile',
    templateUrl: './event-item-mobile.component.html',
    styleUrls: ['./event-item-mobile.component.scss']
})
export class EventItemMobileComponent {
    @Input()
    event: EventModel = EventModel.empty();
}
