import { Component, OnDestroy, OnInit } from '@angular/core';
import { Group, Event } from '@api-interfaces';
import {
    AlertService,
    AuthService,
    EventService,
    GroupService
} from '@services';
import { Subject, takeUntil } from 'rxjs';
import { itemAnimation, slideAnimation } from '@animations';

/**
 * Groups component
 */
@Component({
    selector: 'mate-team-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
    animations: [itemAnimation, slideAnimation]
})
export class GroupsComponent implements OnInit, OnDestroy {
    /**
     * Destroy subject
     * @private
     */
    private destroy$ = new Subject();
    /**
     * Events sorted by datetime
     */
    sortedEvents: Event[] = [];
    /**
     * Groups
     */
    groups: Promise<Group[]>;
    /**
     * Invitations
     */
    invitations: Promise<Group[]>;
    /**
     * keyword to filter the list of members
     */
    term = '';

    /**
     * Constructor groups component
     * @param groupService {GroupService}
     * @param eventService {EventService}
     * @param authService {AuthService}
     * @param alertService {AlertService}
     */
    constructor(
        public groupService: GroupService,
        public eventService: EventService,
        private authService: AuthService,
        private alertService: AlertService
    ) {
        this.groups = this.groupService.getUserGroups();
        this.invitations = this.groupService.getUserInvitations();
    }

    /**
     * Check if user is admin
     *
     * @param adminId {string} The id of the group admin
     * @returns {boolean} Indicates if user is admin
     */
    checkIfAdmin(adminId: string): boolean {
        const userId = this.authService.getCurrentUser().uid;
        return userId === adminId;
    }

    /**
     * Decline invitation of a group
     *
     * @param groupId {string} The id of the group to decline the invitation for
     */
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

    /**
     * Accept invitation of a group
     *
     * @param groupId {string} The id of the group to accept the invitation for
     */
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

    /**
     * Sort events by date
     *
     * @param events {Event[]} The events to sort
     * @returns {Event[]} The events sorted by date
     */
    sortByDate(events: Event[]): Event[] {
        return events.sort((a, b) => {
            return b.date.localeCompare(a.date);
        });
    }

    /**
     * Get upcoming events
     */
    ngOnInit(): void {
        this.eventService
            .getUpcomingEvents()
            .pipe(takeUntil(this.destroy$))
            .subscribe((events) => {
                this.sortedEvents = this.sortByDate(events);
            });
    }

    /**
     * Unsubscribe from observables
     */
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
