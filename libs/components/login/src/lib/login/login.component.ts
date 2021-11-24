import { Component } from '@angular/core';

@Component({
    selector: 'mate-team-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    /**
     * Determines if login form or email form component is shown
     */
    showLogin = true;
}
