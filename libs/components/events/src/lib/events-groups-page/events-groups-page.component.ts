import { Component, OnInit } from '@angular/core';
import { EventService, GroupService } from '@services';
import { Event, Group } from '@api-interfaces';
import {Observable} from 'rxjs';

@Component({
    selector: 'mate-team-events-groups-page',
    templateUrl: './events-groups-page.component.html',
    styleUrls: ['./events-groups-page.component.scss']
})
export class EventsGroupsPageComponent implements OnInit {
    loading = false;
    /**
     * Events that are displayed
     */
    events: Observable<Event[]> = this.eventService.getEvents();
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
    ) {

    }

    /**
     * Sets the events and groups.
     */
    ngOnInit(): void {
        this.events.subscribe();
        /*
        this.eventService.getEvents().subscribe((events) => {
            this.events = events;
            this.loading = false;
        });

         */
    }
}
