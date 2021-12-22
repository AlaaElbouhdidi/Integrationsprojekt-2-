import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Event, Group, Poll } from '@api-interfaces';
import { Subject, takeUntil } from 'rxjs';
import { AlertService, AuthService, EventService, GroupService, PollService } from '@services';

/**
 * Group polls events component
 */
@Component({
    selector: 'mate-team-group-polls-events',
    templateUrl: './group-polls-events.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./group-polls-events.component.scss']
})
export class GroupPollsEventsComponent implements OnInit, OnDestroy {
    /**
     * Subject for unsubscribing from observables
     * @private
     */
    private destroy$ = new Subject();
    /**
     * Group
     */
    group: Group = {} as Group;
    /**
     * Polls
     */
    polls: Poll[] = [];
    events: Event[] = [];
    /**
     * Reference for the confirmation modal
     */
    confirmationModalRef: NgbModalRef | undefined;
    /**
     * Reference for the poll modal
     */
    pollModalRef: NgbModalRef | undefined;
    /**
     * Determines if user is admin
     */
    isAdmin = false;

    /**
     * Constructor of group polls events
     * @param modalService {NgbModal}
     * @param pollService {PollService}
     * @param alertService {AlertService}
     * @param authService {AuthService}
     * @param groupService {GroupService}
     * @param eventService {EventService}
     */
    constructor(
        private modalService: NgbModal,
        private pollService: PollService,
        private alertService: AlertService,
        private authService: AuthService,
        private groupService: GroupService,
        private eventService: EventService
    ) { }

    /**
     * Opens the poll modal
     *
     * @param content {unknown} The modal to open
     */
    openPollModal(content: unknown): void {
        this.pollModalRef = this.modalService.open(content, { windowClass: 'dark-modal' });
    }

    /**
     * Closes the poll modal
     */
    closePollModal(): void {
        this.pollModalRef?.dismiss();
    }

    /**
     * Opens the confirmation modal
     *
     * @param content {unknown} The modal to open
     * @returns {Promise<boolean>} A promise containing true if modal is closed and false if modal is dismissed
     */
    async openConfirmationModal(content: unknown): Promise<boolean> {
        this.confirmationModalRef = this.modalService.open(content, { windowClass: 'dark-modal' });
        try {
            await this.confirmationModalRef.result;
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Dismiss the confirmation modal
     */
    dismissConfirmationModal(): void {
        this.confirmationModalRef?.dismiss();
    }

    /**
     * Close the confirmation modal
     *
     * @param ind {boolean} Indicates if action was confirmed
     */
    closeConfirmationModal(ind: boolean): void {
        this.confirmationModalRef?.close(ind);
    }

    /**
     * Create a poll
     *
     * @param data {Poll} The poll to create
     */
    async createPoll(data: Poll): Promise<void> {
        if (!this.checkIfAdmin(this.group.admin)) {
            return;
        }
        try {
            await this.pollService.createPoll(data);
            this.alertService.addAlert({
                type: 'success',
                message: 'Poll successfully created'
            })
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
        this.closePollModal();
    }

    /**
     * Update a poll
     *
     * @param poll {Poll} The poll data to update
     */
    async updatePoll(poll: Poll): Promise<void> {
        try {
            const user = this.authService.getCurrentUser();
            if (poll.usersVoted.includes(user.uid, 0) || !poll.id) {
                return;
            }
            poll.usersVoted.push(user.uid);
            await this.pollService.updatePoll(poll.id, poll);
            this.alertService.addAlert({
                type: 'success',
                message: 'Vote successfully registered'
            });
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }

    /**
     * Delete a poll
     *
     * @param id {string} The id of the poll to delete
     * @param modal {unknown} The confirmation modal to open
     */
    async deletePoll(id: string, modal: unknown): Promise<void> {
        const result = await this.openConfirmationModal(modal);
        if (!result) {
            return;
        }
        if (!this.checkIfAdmin(this.group.admin)) {
            return;
        }
        try {
            await this.pollService.deletePoll(id);
            this.alertService.addAlert({
                type: 'success',
                message: 'Poll successfully deleted'
            });
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }

    async updateEvent(event: Event): Promise<void> {
        if (!event.id) {
            return;
        }
        try {
            await this.eventService.updateEvent(event.id, event);
            this.alertService.addAlert({
                type: 'success',
                message: 'Participation successfully registered'
            });
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }

    async deleteEvent(id: string, modal: unknown): Promise<void> {
        const result = await this.openConfirmationModal(modal);
        if (!result) {
            return;
        }
        if (!this.checkIfAdmin(this.group.admin)) {
            return;
        }
        try {
            await this.eventService.deleteEvent(id);
            this.alertService.addAlert({
                type: 'success',
                message: 'Event successfully deleted'
            });
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }

    /**
     * Checks if a given id matches the user id
     *
     * @param adminId {string} The id of the admin
     * @returns {boolean} True if user id matches the given id, false if the ids do not match
     */
    checkIfAdmin(adminId: string): boolean {
        const userId = this.authService.getCurrentUser().uid;
        return userId === adminId;
    }

    /**
     * Get group and polls of group on component init
     */
    async ngOnInit(): Promise<void> {
        try {
            const group = await this.groupService.getGroupById(this.groupService.currentGroupId);
            this.group = group ? group : {} as Group;
            if (group) {
                this.isAdmin = this.checkIfAdmin(group.admin);
            }
            this.pollService.getPolls()
                .pipe(takeUntil(this.destroy$))
                .subscribe(data => {
                        this.polls = data as Poll[];
                    }
                );
            this.eventService.getActiveEventsOfGroup()
                .pipe(takeUntil(this.destroy$))
                .subscribe((data: Event[]) => {
                    this.events = data;
                });
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }

    /**
     * Unsubscribe from observables
     */
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
