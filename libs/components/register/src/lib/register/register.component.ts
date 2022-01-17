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
     * @param alertService {AlertService}
     */
    constructor(public alertService: AlertService) {}
}
