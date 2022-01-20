import { Component, OnDestroy, OnInit } from '@angular/core';
import { Group, Event, User } from '@api-interfaces';
import {
    AlertService,
    AuthService,
    EventService,
    GroupService,
    UserService
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
     * User on component init
     */
    userOnInit: User = {} as User;
    /**
     * Indicates if events are done loading
     */
    eventsLoading = true;
    /**
     * check is Account is verified
     */
    isVerified = false;

    /**
     * Constructor groups component
     * @param groupService {GroupService}
     * @param eventService {EventService}
     * @param authService {AuthService}
     * @param alertService {AlertService}
     * @param userService {UserService}
     */
    constructor(
        public groupService: GroupService,
        public eventService: EventService,
        private authService: AuthService,
        private alertService: AlertService,
        private userService: UserService
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
        try {
            const userId = this.authService.getCurrentUser().uid;
            return userId === adminId;
        } catch (e) {
            return false;
        }
    }

    /**
     * Decline invitation of a group
     *
     * @param groupId {string} The id of the group to decline the invitation for
     */
    async declineInvitation(groupId: string): Promise<void> {
        try {
            await this.groupService.declineUserGroupInvitation(groupId);
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
     * Get upcoming events and watch for user data changes to update invitations and groups
     */
    async ngOnInit(): Promise<void> {
        this.eventService
            .getUpcomingEvents()
            .pipe(takeUntil(this.destroy$))
            .subscribe((events) => {
                this.sortedEvents = this.sortByDate(events);
                this.eventsLoading = false;
            });

        const user = this.authService.getCurrentUser();
        this.isVerified = user.emailVerified || false;
        this.userOnInit = await this.userService.getUserByUid(user.uid);

        this.groupService
            .userDataChanges()
            .pipe(takeUntil(this.destroy$))
            .subscribe((user) => {
                if (!user) {
                    return;
                }
                if (
                    !this.arrayEquals(
                        this.userOnInit.groups ? this.userOnInit.groups : [],
                        user.groups ? user.groups : []
                    )
                ) {
                    this.groups = this.groupService.getUserGroups();
                    this.userOnInit.groups = user.groups;
                }
                if (
                    !this.arrayEquals(
                        this.userOnInit.invitations
                            ? this.userOnInit.invitations
                            : [],
                        user.invitations ? user.invitations : []
                    )
                ) {
                    this.invitations = this.groupService.getUserInvitations();
                    this.userOnInit.invitations = user.invitations;
                }
            });
    }

    /**
     * Check if two array are equal
     *
     * @param a {Array<string>} Array to compare
     * @param b {Array<string>} Array to compare
     * @returns {boolean} True if arrays are equals - false if not
     */
    arrayEquals(a: Array<string>, b: Array<string>): boolean {
        return (
            Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index])
        );
    }

    /**
     * Unsubscribe from observables
     */
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
