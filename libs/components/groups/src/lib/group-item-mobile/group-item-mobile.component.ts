import {Component, Input, OnInit} from '@angular/core';
import {GroupModel} from "../shared/models/GroupModel";

@Component({
  selector: 'mate-team-group-item-mobile',
  templateUrl: './group-item-mobile.component.html',
  styleUrls: ['./group-item-mobile.component.scss']
})
export class GroupItemMobileComponent {
    @Input()
    group: GroupModel | undefined;

}
