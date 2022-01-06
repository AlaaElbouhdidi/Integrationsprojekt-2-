import { Component } from '@angular/core';
import { GroupService } from '@services';
import { Event, Group } from '@api-interfaces';

@Component({
    selector: 'mate-team-events-groups-page',
    templateUrl: './events-groups-page.component.html',
    styleUrls: ['./events-groups-page.component.scss']
})
export class EventsGroupsPageComponent {
    loading = false;
    /**
     * Events that are displayed
     */
    events: Event[] | undefined;
    /**
     * Groups that are displayed
     */
    groups: Group[] | undefined;

    /**
     * Constructor which gets the GroupService
     * @param groupService
     */
    constructor(
        private groupService: GroupService
    ) {}
}
