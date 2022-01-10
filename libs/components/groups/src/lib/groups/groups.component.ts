import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from '@api-interfaces';
import { GroupService } from '@services';

@Component({
    selector: 'mate-team-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss']
})
export class GroupsComponent {
    groups: Promise<Group[]>;
    /**
     * keyword to filter the list of members
     */
    term = '';
    constructor(public groupService: GroupService, private router: Router) {
        this.groups = this.groupService.getUserGroups();
    }
}
