import { Component, OnDestroy } from '@angular/core';
import { AlertService, GroupService } from '@services';
import { Subscription } from 'rxjs';
import { slideAnimation } from '@animations';

@Component({
    selector: 'mate-team-newgroup',
    templateUrl: './newgroup.component.html',
    styleUrls: ['./newgroup.component.scss'],
    animations: [slideAnimation]
})
export class NewgroupComponent implements OnDestroy {
    success = false;
    subscription: Subscription;
    /**
     * Constructor of register component
     * @param alertService {AlertService}
     * @param groupService {GroupService}
     */
    constructor(
        public alertService: AlertService,
        private groupService: GroupService
    ) {
        this.subscription = this.groupService
            .onToggle()
            .subscribe((value) => (this.success = value != ''));
    }
    ngOnDestroy() {
        // Unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}
