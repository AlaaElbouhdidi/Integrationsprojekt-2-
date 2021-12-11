import { Component, OnInit } from '@angular/core';
import { EventService, GroupService } from '@services';
import { Event, Group } from '@api-interfaces';
import { zip } from 'rxjs';
// import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
    selector: 'mate-team-events-groups-page',
    templateUrl: './events-groups-page.component.html',
    styleUrls: ['./events-groups-page.component.scss']
})
export class EventsGroupsPageComponent implements OnInit {
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

    /**
     * Sets the events and groups.
     */
    ngOnInit(): void {
        zip(
            this.eventService.getEvents(),
            this.groupService.getGroups()
        ).subscribe(([events, groups]) => {
            this.events = events;
            this.groups = groups;
            this.loading = false;
        });
    }
}
