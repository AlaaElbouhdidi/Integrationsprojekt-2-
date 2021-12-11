import { AfterViewInit, Component, Input } from '@angular/core';
import { AlertService } from '@services';

@Component({
    selector: 'mate-team-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements AfterViewInit {
    /**
     * The message of the alert
     */
    @Input() message = '';
    /**
     * The type of the alert
     */
    @Input() type = '';
    /**
     * Time which determines how long alert appears on page
     */
    @Input() remainingTime = 5000;

    constructor(private alertService: AlertService) {}

    /**
     * Remove alert after time specified in remainingTime property
     */
    removeAlertAfterTime(): void {
        const interval = setInterval(() => {
            this.alertService.removeAlert();
            clearInterval(interval);
        }, this.remainingTime);
    }

    /**
     * Removes alert after view inits
     */
    ngAfterViewInit() {
        this.removeAlertAfterTime();
    }
}
