import { Component } from '@angular/core';
import { Group } from '@api-interfaces';
import { AuthService, GroupService } from '@services';
import { itemAnimation, slideAnimation } from '@animations';

@Component({
    selector: 'mate-team-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
    animations: [itemAnimation, slideAnimation]
})
export class GroupsComponent {
    groups: Promise<Group[]>;
    /**
     * keyword to filter the list of members
     */
    term = '';
    orderByName = true;
    constructor(
        public groupService: GroupService,
        private authService: AuthService
    ) {
        this.groups = this.groupService.getUserGroups();
    }

    checkIfAdmin(adminId: string): boolean {
        const userId = this.authService.getCurrentUser().uid;
        return userId === adminId;
    }

    orderListByName() {
        this.orderByName = true;
    }

    orderListByAdmin() {
        this.orderByName = false;
    }
}
