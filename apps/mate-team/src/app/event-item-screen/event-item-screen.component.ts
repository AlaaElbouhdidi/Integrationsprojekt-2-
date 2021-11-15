import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventModel} from "../shared/models/EventModel";

@Component({
  selector: 'integrationsprojekt2-event-item-screen',
  templateUrl: './event-item-screen.component.html',
  styleUrls: ['./event-item-screen.component.scss']
})
export class EventItemScreenComponent {
    @Output()
    clicked: EventEmitter<void> = new EventEmitter<void>();
    @Input()
    event: EventModel = EventModel.empty();
}
