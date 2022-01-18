import { Component } from '@angular/core';
import { Group, Event } from '@api-interfaces';
import {
    AlertService,
    AuthService,
    EventService,
    GroupService,
    UserService
} from '@services';
import { Observable } from 'rxjs';
import { itemAnimation, slideAnimation } from '@animations';

@Component({
    selector: 'mate-team-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
    animations: [itemAnimation, slideAnimation]
})
export class GroupsComponent {
    events: Observable<Event[]>;
    groups: Promise<Group[]>;
    invitations: Promise<Group[]>;
    /**
     * keyword to filter the list of members
     */
    term = '';
    orderByName = true;
    constructor(
        public groupService: GroupService,
        public eventService: EventService,
        private authService: AuthService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        this.groups = this.groupService.getUserGroups();
        this.events = this.eventService.getUpcomingEvents();
        this.invitations = this.groupService.getUserInvitations();
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

    async declineInvitation(groupId: string): Promise<void> {
        try {
            await this.groupService.declineUserGroupInvitation(groupId);
            window.location.reload();
            this.alertService.addAlert({
                type: 'success',
                message: 'Invitation declined'
            });
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }

    async acceptInvitation(groupId: string): Promise<void> {
        try {
            await this.groupService.acceptUserGroupInvitation(groupId);
            window.location.reload();
            this.alertService.addAlert({
                type: 'success',
                message: 'Invitation accepted'
            });
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }
}
