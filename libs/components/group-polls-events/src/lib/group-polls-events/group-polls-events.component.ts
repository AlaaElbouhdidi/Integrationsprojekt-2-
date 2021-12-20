import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Group, Poll } from '@api-interfaces';
import { Subject, takeUntil } from 'rxjs';
import { AlertService, AuthService, GroupService, PollService } from '@services';

@Component({
    selector: 'mate-team-group-polls-events',
    templateUrl: './group-polls-events.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./group-polls-events.component.scss']
})
export class GroupPollsEventsComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject();
    group: Group = {} as Group;
    polls: Poll[] = [];
    confirmationModalRef: NgbModalRef | undefined;
    pollModalRef: NgbModalRef | undefined;
    isAdmin = false;

    constructor(
        private modalService: NgbModal,
        private pollService: PollService,
        private alertService: AlertService,
        private authService: AuthService,
        private groupService: GroupService
    ) { }

    openPollModal(content: unknown): void {
        this.pollModalRef = this.modalService.open(content, { windowClass: 'dark-modal' });
    }

    closePollModal(): void {
        this.pollModalRef?.dismiss();
    }

    async openConfirmationModal(content: unknown): Promise<boolean> {
        this.confirmationModalRef = this.modalService.open(content, { windowClass: 'dark-modal' });
        try {
            await this.confirmationModalRef.result;
            return true;
        } catch {
            return false;
        }
    }

    dismissConfirmationModal(): void {
        this.confirmationModalRef?.dismiss();
    }

    closeConfirmationModal(ind: boolean): void {
        this.confirmationModalRef?.close(ind);
    }

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

    checkIfAdmin(adminId: string): boolean {
        const userId = this.authService.getCurrentUser().uid;
        return userId === adminId;
    }

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
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
