import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Member } from '@api-interfaces';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
    AlertService,
    AuthService,
    GroupService,
    UserService
} from '@services';
import { Subject, takeUntil } from 'rxjs';
import { itemAnimation, slideAnimation } from '@animations';

@Component({
    selector: 'mate-team-members-list',
    templateUrl: './members-list.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./members-list.component.scss'],
    animations: [slideAnimation, itemAnimation]
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
     * @param route {ActivatedRoute}
     * @param modalService {NgbModal}
     * @param userService {UserService}
     */
    constructor(
        private groupService: GroupService,
        private modalService: NgbModal,
        private authService: AuthService,
        private userService: UserService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private router: Router
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
            if (!m.uid) {
                return;
            }
            await this.groupService.deleteMember(this.gid, m);
            await this.groupService.removeUserGroupReference(this.gid, m.uid);
            this.alertService.addAlert({
                type: 'success',
                message: 'Member successfully deleted'
            });
        } catch (e) {
            if (e instanceof Error) {
                this.alertService.addAlert({
                    type: 'error',
                    message: e.message
                });
            }
        }
    }

    async toggleIsAdmin(m: Member, modal: unknown) {
        const result = await this.openConfirmationModal(modal);
        if (!result) {
            return;
        }
        try {
            if (!m.uid) {
                return;
            }
            await this.groupService.toggleIsAdmin(this.gid, m);
            this.alertService.addAlert({
                type: 'success',
                message: 'Admin successfully updated'
            });
            const currentUrl = this.router.url;
            this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                    this.router.navigate([currentUrl]);
                });
        } catch (e) {
            if (e instanceof Error) {
                this.alertService.addAlert({
                    type: 'error',
                    message: e.message
                });
            }
        }
    }

    sendInvitation(success: boolean) {
        if (success) {
            this.alertService.addAlert({
                type: 'success',
                message: 'Invitation successfully send'
            });
        } else {
            this.alertService.addAlert({
                type: 'error',
                message: 'Error occurred while sending invitation'
            });
        }
        this.closeModal();
    }
    /**
     * Opens a modal where the user can add members
     *
     * @param content {unknown} The modal reference
     */
    openModal(content: unknown) {
        this.modalRef = this.modalService.open(content, {
            windowClass: 'dark-modal'
        });
    }
    /**
     * Closes a modal
     */
    closeModal(): void {
        this.modalRef?.dismiss();
    }
    /**fixed lint of added events and groups componentsise containing true if modal is closed and false if modal is dismissed
     */
    async openConfirmationModal(content: unknown): Promise<boolean> {
        this.confirmationModalRef = this.modalService.open(content, {
            windowClass: 'dark-modal'
        });
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
            this.groupService
                .getAllMembers(this.gid)
                .pipe(takeUntil(this.destroy$))
                .subscribe((items) => {
                    /* const fil = items.filter((m) => ((m.email === this.myEmail) && m.isAdmin));
                    if (fil.length > 0) this.isAdmin = true;
                    else this.isAdmin = false */
                    items.forEach((i) => {
                        i.user = {} as User;
                        this.userService.getUser(i.email || '').then((u) => {
                            if (u) i.user = u;
                            else {
                                i.user = {} as User;
                            }
                        });
                    });
                    this.membersList = items;
                });
            this.groupService.getGroupById(this.gid).then((res) => {
                if (res) this.gAdmin = res.admin;
            });
        } catch (e) {
            if (e instanceof Error) {
                this.alertService.addAlert({
                    type: 'error',
                    message: e.message
                });
            }
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
