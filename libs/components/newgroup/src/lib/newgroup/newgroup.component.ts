import { Component, OnDestroy } from '@angular/core';
import { AlertService, GroupService } from '@services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'mate-team-newgroup',
    templateUrl: './newgroup.component.html',
    styleUrls: ['./newgroup.component.scss'],
})
export class NewgroupComponent implements OnDestroy {
    success = false;
    subscription: Subscription;

    constructor(
        public alertService: AlertService,
        private groupService: GroupService
    ) {
        this.subscription = this.groupService
            .onToggle()
            .subscribe((value) => (this.success = value));
    }

    ngOnDestroy() {
        // Unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}
