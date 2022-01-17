import { Component } from '@angular/core';
import { slideAnimation } from '@animations';

/**
 * Login component
 */
@Component({
    selector: 'mate-team-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [slideAnimation]
})
export class LoginComponent {
    /**
     * Determines if login form or email form component is shown
     */
    showLogin = true;
}
