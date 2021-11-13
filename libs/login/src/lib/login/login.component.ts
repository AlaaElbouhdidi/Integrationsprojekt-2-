import { Component } from '@angular/core';
import { AlertService } from '@integrationsprojekt2/services';

@Component({
    selector: 'integrationsprojekt2-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    constructor(
      public alertService: AlertService
    ) {}
}
