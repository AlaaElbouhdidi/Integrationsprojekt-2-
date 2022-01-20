import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AlertService, AuthService, GroupService } from '@services';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Group } from '@api-interfaces';
/**
 * Group component
 */
@Component({
    selector: 'mate-team-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {
    /**
     * Subject for unsubscribing from observables
     * @private
     */
    private destroy$ = new Subject();
    /**
     * Group id
     */
    groupId = '';
    /**
     * Active Route
     */
    activeRoute = '';
    /**
     * Admin status of the current user
     */
    isAdmin = false;
    /**
     * Admin status of the current user
     */
    group: Group = {} as Group;

    /**
     * Modal reference
     */
    modalRef: NgbModalRef | undefined;
    /**
     * Reference for the confirmation modal
     */
    confirmationModalRef: NgbModalRef | undefined;

    /**
     * Constructor of group
     * @param route {ActivatedRoute}
     * @param router {Router}
     * @param groupService {GroupService}
     * @param modalService {NgbModal}
     * @param authService {AuthService}
     * @param alertService {AlertService}
     */
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private groupService: GroupService,
        private authService: AuthService,
        private alertService: AlertService,
        private modalService: NgbModal
    ) {
        this.activeRoute = this.router.url;
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
    /**
     * Delete a group if Admin
     */
    async deleteGroup(modal: unknown): Promise<void> {
        const result = await this.openConfirmationModal(modal);
        if (!result) {
            return;
        }
        try {
            await this.groupService.deleteGroup(this.groupId);
            this.closeModal();
            this.router.navigateByUrl('/');
        } catch (e: any) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }

    /**
     * Check if a user is the group admin
     *
     * @returns {Promise<boolean>} True if user is group admin, false if not
     */
    async checkIfGroupAdmin(): Promise<boolean> {
        const group = await this.groupService.getGroupById(this.groupId);
        const { uid } = this.authService.getCurrentUser();
        return group?.admin === uid;
    }

    /**
     * Leave a group if not Admin
     */
    async leaveGroup(modal: unknown): Promise<void> {
        const result = await this.openConfirmationModal(modal);
        const user = this.authService.getCurrentUser();
        if (!result) {
            return;
        }
        if (!user || !this.groupId) {
            return;
        }
        if (await this.checkIfGroupAdmin()) {
            this.alertService.addAlert({
                type: 'warn',
                message: 'You can not leave the group if you are the admin'
            });
            return;
        }
        try {
            await this.groupService.deleteMember(this.groupId, {
                uid: user.uid,
                email: user.email
            });
            await this.groupService.removeUserGroupReference(
                this.groupId,
                user.uid
            );
            await this.router.navigate(['/group']);
            this.alertService.addAlert({
                type: 'success',
                message: 'Group and all corresponding events successfully left'
            });
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }

    /**
     * Manage the Group
     */
    async manageGroup(data: any) {
        if (data) {
            await this.groupService.updateGroup(
                this.groupId,
                data.name,
                data.description
            );
            window.location.reload();
        }
        this.closeModal();
    }

    /**
     * Get route parameters and set active Route on init
     */
    ngOnInit(): void {
        this.route.paramMap
            .pipe(takeUntil(this.destroy$))
            .subscribe((param) => {
                this.groupId = param.get('id') || '';
                this.groupService.currentGroupId =
                    param.get('id') === null ? '' : (param.get('id') as string);
                if (this.groupId != null) {
                    this.groupService.getGroupById(this.groupId).then((g) => {
                        if (g) {
                            this.group = g;
                            if (
                                g?.admin ==
                                this.authService.getCurrentUser().uid
                            )
                                this.isAdmin = true;
                        }
                    });
                }
            });
        this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.activeRoute = this.router.url;
            }
        });
    }

    /**
     * Navigate to a given child route
     *
     * @param routeParam The parameter to navigate to
     */
    navigateTo(routeParam: 'events' | 'statistics' | 'members'): void {
        this.router.navigate([routeParam], { relativeTo: this.route });
    }

    /**
     * Opens the confirmation modal
     *
     * @param content {unknown} The modal to open
     * @returns {Promise<boolean>} A promise containing true if modal is closed and false if modal is dismissed
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
     * Unsubscribe from observables
     */
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
