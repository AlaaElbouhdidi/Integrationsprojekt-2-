import {Component, Input, OnInit} from '@angular/core';
import {EventModel} from "../shared/models/EventModel";
import {GroupModel} from "../shared/models/GroupModel";

@Component({
  selector: 'integrationsprojekt2-events-groups-page-screen',
  templateUrl: './events-groups-page-screen.component.html',
  styleUrls: ['./events-groups-page-screen.component.scss']
})
export class EventsGroupsPageScreenComponent implements OnInit {
    @Input()
    events: EventModel[] | undefined;
    @Input()
    groups: GroupModel[] | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
