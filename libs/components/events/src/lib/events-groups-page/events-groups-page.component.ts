import { Component, OnInit } from '@angular/core';
import {EventClientService} from "../shared/clients/event-client.service";
import {GroupClientService} from "../shared/clients/group-client.service";
import {zip} from "rxjs";
import {EventModel} from "../shared/models/EventModel";
import {GroupModel} from "../shared/models/GroupModel";

@Component({
  selector: 'mate-team-integrationsprojekt2-events-groups-page',
  templateUrl: './events-groups-page.component.html',
  styleUrls: ['./events-groups-page.component.scss']
})
export class EventsGroupsPageComponent implements OnInit {
    events: EventModel[] | undefined;
    groups: GroupModel[] | undefined;

    constructor(private eventClientService: EventClientService,
                private groupClientService: GroupClientService) { }

    ngOnInit(): void {
        zip(this.eventClientService.getEvents(), this.groupClientService.getGroups()).subscribe(([events, groups]) => {
            this.events = events;
            this.groups = groups;
        });
    }
}
