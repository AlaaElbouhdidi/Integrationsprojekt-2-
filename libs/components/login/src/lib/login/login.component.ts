import { Component } from '@angular/core';
import { AlertService } from '@services';

@Component({
    selector: 'integrationsprojekt2-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    constructor(public alertService: AlertService) {}
}
