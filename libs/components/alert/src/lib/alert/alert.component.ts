import { AfterViewInit, Component, Input } from '@angular/core';
import { AlertService } from '@integrationsprojekt2/services';

@Component({
    selector: 'integrationsprojekt2-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements AfterViewInit {
    @Input() message = '';
    @Input() type = '';
    @Input() remainingTime = 5000;

    constructor(private alertService: AlertService) {}

    removeAlertAfterTime(): void {
        const interval = setInterval(() => {
            this.alertService.removeAlert();
            clearInterval(interval);
        }, this.remainingTime);
    }

    ngAfterViewInit() {
        this.removeAlertAfterTime();
    }
}
