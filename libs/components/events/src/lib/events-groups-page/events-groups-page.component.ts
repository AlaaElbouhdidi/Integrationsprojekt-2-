import { Component } from '@angular/core';
import { EventService, GroupService } from '@services';
import { Event, Group } from '@api-interfaces';

@Component({
    selector: 'mate-team-events-groups-page',
    templateUrl: './events-groups-page.component.html',
    styleUrls: ['./events-groups-page.component.scss']
})
export class EventsGroupsPageComponent {
    loading = true;
    /**
     * Events that are displayed
     */
    events: Event[] | undefined;
    /**
     * Groups that are displayed
     */
    groups: Group[] | undefined;

    /**
     * Constructor which gets the GroupService and EventService
     * @param eventService
     * @param groupService
     */
    constructor(
        private eventService: EventService,
        private groupService: GroupService
    ) {}
}
