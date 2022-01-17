import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

/**
 * Login component
 */
@Component({
    selector: 'mate-team-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [
        trigger('slideAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(-2rem)' }),
                animate(
                    '200ms',
                    style({ opacity: 1, transform: 'translateY(0)' })
                )
            ])
        ])
    ]
})
export class LoginComponent {
    /**
     * Determines if login form or email form component is shown
     */
    showLogin = true;
}
