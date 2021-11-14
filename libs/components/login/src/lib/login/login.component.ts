import { Component } from '@angular/core';
import { AlertService } from '@services';

@Component({
    selector: 'mate-team-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    constructor(public alertService: AlertService) {}
}
