import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GroupModel} from "../shared/models/GroupModel";

@Component({
  selector: 'mate-team-group-item-screen',
  templateUrl: './group-item-screen.component.html',
  styleUrls: ['./group-item-screen.component.scss']
})
export class GroupItemScreenComponent {
    @Input()
    group: GroupModel | undefined;
    @Output()
    clicked: EventEmitter<void> = new EventEmitter();
}
