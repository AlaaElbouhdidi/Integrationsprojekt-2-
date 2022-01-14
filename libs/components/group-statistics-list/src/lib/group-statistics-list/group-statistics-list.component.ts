import { Component, OnInit } from '@angular/core';
import {EventService} from "@services";
import {Event} from "@api-interfaces";

@Component({
  selector: 'mate-team-group-statistics-list',
  templateUrl: './group-statistics-list.component.html',
  styleUrls: ['./group-statistics-list.component.scss']
})
export class GroupStatisticsListComponent implements OnInit {

    public events: Event[] = [];

    public event:Event = {
        name: 'Test',
        date: "",
        description: "",
        done: true,
        groupID: "",
        participants: [],
    };
    public event2:Event = {
        name: 'Test2',
        date: "",
        description: "",
        done: true,
        groupID: "",
        participants: [],
    };
    public testEvents: Event[] = [this.event, this.event2];

    constructor(public eventService: EventService) {
        this.eventService.getDoneEventsOfGroup().subscribe(events => this.events.push(...events));
    }

    ngOnInit(): void {
        console.log('GroupStatisticsListComponent loaded');
        console.log(this.testEvents);
    }

}
