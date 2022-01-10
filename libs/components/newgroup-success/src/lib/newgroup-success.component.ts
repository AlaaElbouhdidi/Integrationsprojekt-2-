import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService, AlertService } from '@services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'mate-team-newgroup-success',
    templateUrl: './newgroup-success.component.html',
    styleUrls: ['./newgroup-success.component.scss']
})
export class NewgroupSuccessComponent implements OnDestroy {
    /**
     * subscription for the gid from the form component
     */
    subscription: Subscription;
    /**
     * created group id
     */
    gid = '';
    /**
     * Modal reference
     */
    modalRef: NgbModalRef | undefined;
    /**
     * Constructor which initializes the reactive register form
     * @param groupService {GroupService}
     * @param authService {AuthService}
     * @param alertService {AlertService}
     * @param router {Router}
     */
    constructor(
        private groupService: GroupService,
        private modalService: NgbModal,
        private alertService: AlertService,
        private router: Router
    ) {
        this.subscription = this.groupService.onToggle().subscribe((value) => {
            this.gid = value;
        });
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

    ngOnDestroy() {
        // Unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
    addMember(success: boolean) {
        if (success) {
            this.alertService.addAlert({
                type: 'success',
                message: 'Members successfully added'
            });
        }
        this.closeModal();
        this.router.navigate([`group/${this.gid}/members`]).then(() => {
            window.location.reload();
        });
    }
}
