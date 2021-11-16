import {Component, Input, OnInit} from '@angular/core';
import {GroupModel} from "../shared/models/GroupModel";

@Component({
  selector: 'mate-team-group-section-mobile',
  templateUrl: './group-section-mobile.component.html',
  styleUrls: ['./group-section-mobile.component.scss']
})
export class GroupSectionMobileComponent {
    @Input()
    groups: GroupModel[] | undefined;

}
