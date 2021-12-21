import { Component } from '@angular/core';
import { AlertService } from '@services';

/**
 * Register component
 */
@Component({
    selector: 'mate-team-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    /**
     * Constructor of register component
     * @param alertService {AlertService}
     */
    constructor(public alertService: AlertService) {}
}
