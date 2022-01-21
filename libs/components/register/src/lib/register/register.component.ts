import { Component } from '@angular/core';
import { AlertService } from '@services';
import { slideAnimation } from '@animations';

/**
 * Register component
 */
@Component({
    selector: 'mate-team-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    animations: [slideAnimation]
})
export class RegisterComponent {
    /**
     * Constructor of register component
     * @param alertService {AlertService} The alert service for displaying alerts
     */
    constructor(public alertService: AlertService) {}
}
