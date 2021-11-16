import {Component, Input, OnInit} from '@angular/core';
import {EventModel} from "../shared/models/EventModel";
import {GroupModel} from '../shared/models/GroupModel';

@Component({
  selector: 'mate-team-integrationsprojekt2-events-groups-page-screen',
  templateUrl: './events-groups-page-screen.component.html',
  styleUrls: ['./events-groups-page-screen.component.scss']
})
export class EventsGroupsPageScreenComponent {
    @Input()
    events: EventModel[] | undefined;
    @Input()
    groups: GroupModel[] | undefined;

}
