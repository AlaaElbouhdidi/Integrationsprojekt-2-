import { Component, Input } from '@angular/core';
import { Group, Event } from '@api-interfaces';

@Component({
    selector: 'mate-team-events-groups-page-mobile',
    templateUrl: './events-groups-page-mobile.component.html',
    styleUrls: ['./events-groups-page-mobile.component.scss'],
})
export class EventsGroupsPageMobileComponent {
    /**
     * Events that are displayed
     */
    @Input()
    events: Event[] | undefined;
    /**
     * Groups that are displayed
     */
    @Input()
    groups: Group[] | undefined;
}
