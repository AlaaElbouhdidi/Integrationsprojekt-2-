import { AfterViewInit, Component, Input } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-global-alert',
  templateUrl: './global-alert.component.html',
  styleUrls: ['./global-alert.component.scss'],
})
export class GlobalAlertComponent implements AfterViewInit {

    @Input() message = '';
    @Input() type = '';
    @Input() remainingTime = 5000;

    constructor(
        private alertService: AlertService
    ) { }

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
