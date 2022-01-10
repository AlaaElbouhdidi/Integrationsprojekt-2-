import { Component } from '@angular/core';
import { Group } from '@api-interfaces';
import { GroupService } from '@services';

@Component({
    selector: 'mate-team-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss']
})
export class GroupsComponent {
    groups!: Group[]
    /**
     * keyword to filter the list of members
     */
    term = '';
    constructor(public groupService: GroupService) {
        this.groupService.groupCollection.valueChanges({ idField: 'id'}).subscribe(groups => {
            this.groups = groups
        });
    }
}
