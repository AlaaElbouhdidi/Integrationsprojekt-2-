import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, Member } from '@api-interfaces';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, AuthService, GroupService } from '@services';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'mate-team-members-list',
    templateUrl: './members-list.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit, OnDestroy {
    /**
     * Subject for unsubscribing from observables
     * @private
     */
    private destroy$ = new Subject();
    /**
     * keyword to filter the list of members
     */
    term = '';
    /**
     * Group id
     */
    gid = '';
    /**
     * Group admin id
     */
    gAdmin = '';
    /**
     * get the current user email
     */
    currentUser: User;
    /**
     * Members
     */
    membersList: Member[] = [];
    /**
     * Modal reference
     */
    modalRef: NgbModalRef | undefined;
    /**
     * Reference for the confirmation modal
     */
    confirmationModalRef: NgbModalRef | undefined;

    /**
     * Constructor of group polls events
     * @param modalService {NgbModal}
     * @param alertService {AlertService}
     * @param authService {AuthService}
     * @param groupService {GroupService}
     */
    constructor(
        private groupService: GroupService,
        private modalService: NgbModal,
        private authService: AuthService,
        private alertService: AlertService,
        private route: ActivatedRoute
    ) {
        this.currentUser = this.authService.getCurrentUser() || '';
        this.gid = this.route.parent?.snapshot.params['id'] || '';
    }

    async deleteMember(m: Member, modal: unknown): Promise<void> {
        const result = await this.openConfirmationModal(modal);
        if (!result) {
            return;
        }
        try {
            await this.groupService.deleteMember(this.gid, m);
            this.alertService.addAlert({
                type: 'success',
                message: 'Member successfully deleted'
            });
        } catch (e: any) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }
    toggleIsAdmin(m: Member) {
        this.groupService.toggleIsAdmin(this.gid, m);
        this.alertService.addAlert({
            type: 'success',
            message: 'Member updated'
        });
    }
    addMember(success: boolean) {
        if (success) {
            this.alertService.addAlert({
                type: 'success',
                message: 'Members successfully added'
            });
            this.closeModal();
        }
    }
    /**
     * Opens a modal where the user can add members
     *
     * @param content {unknown} The modal reference
     */
    openModal(content: unknown) {
        this.modalRef = this.modalService.open(content, { windowClass: 'dark-modal' });
    }
    /**
     * Closes a modal
     */
    closeModal(): void {
        this.modalRef?.dismiss();
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
     * Get members of group on component init
     */
    async ngOnInit(): Promise<void> {
        try {
            await this.groupService
                .getAllMembers(this.gid)
                .pipe(takeUntil(this.destroy$))
                .subscribe((items) => {
                    this.membersList = items;
                    /* const fil = items.filter((m) => ((m.email === this.myEmail) && m.isAdmin));
                    if (fil.length > 0) this.isAdmin = true;
                    else this.isAdmin = false */
                    items.forEach((i) => {
                        this.authService.getUser(i.email || '').then((u)=> {
                            i.user = u;
                        });
                    });
                });
            this.groupService.getGroupById(this.gid).then((res) => {
                if (res) this.gAdmin = res.admin;
            });
        } catch (err: any) {
            this.alertService.addAlert({
                type: 'error',
                message: err.message
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
