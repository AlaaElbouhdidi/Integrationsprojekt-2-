import { Component, OnInit } from '@angular/core';
import { EventService, GroupService } from '@services';
import { Event, Group } from '@api-interfaces';
import { zip } from 'rxjs';

@Component({
    selector: 'mate-team-events-groups-page',
    templateUrl: './events-groups-page.component.html',
    styleUrls: ['./events-groups-page.component.scss'],
})
export class EventsGroupsPageComponent implements OnInit {
    events: Event[] | undefined;
    groups: Group[] | undefined;

    constructor(
        private eventService: EventService,
        private groupService: GroupService
    ) {}

    ngOnInit(): void {
        zip(
            this.eventService.getEvents(),
            this.groupService.getGroups()
        ).subscribe(([events, groups]) => {
            this.events = events;
            this.groups = groups;
        });
    }
}
