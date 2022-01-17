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
     * Admin statu of the current user
     */
    isAdmin = false;
    /**
     * Admin statu of the current user
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
     * manage the Group
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
            windowClass: 'light-modal'
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

    /**
     * Unsubscribe from observables
     */
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
