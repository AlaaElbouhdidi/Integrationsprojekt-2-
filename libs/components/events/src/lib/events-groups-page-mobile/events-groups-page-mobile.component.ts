import { Component, Input } from '@angular/core';
import { Group, Event } from '@api-interfaces';

@Component({
    selector: 'mate-team-events-groups-page-mobile',
    templateUrl: './events-groups-page-mobile.component.html',
    styleUrls: ['./events-groups-page-mobile.component.scss'],
})
export class EventsGroupsPageMobileComponent {
    @Input()
    events: Event[] | undefined;
    @Input()
    groups: Group[] | undefined;
}
