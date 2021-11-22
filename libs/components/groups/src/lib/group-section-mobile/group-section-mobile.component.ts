import { Component, Input } from '@angular/core';
import { Group } from '@api-interfaces';
import { GroupModel } from '@services';
//import { GroupModel } from '../shared/models/GroupModel';

@Component({
    selector: 'mate-team-group-section-mobile',
    templateUrl: './group-section-mobile.component.html',
    styleUrls: ['./group-section-mobile.component.scss'],
})
export class GroupSectionMobileComponent {
    @Input()
    public groups: Group[] | undefined;
}
