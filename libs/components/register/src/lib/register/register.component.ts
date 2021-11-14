import { Component } from '@angular/core';
import { AlertService } from '@services';

@Component({
    selector: 'mate-team-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    constructor(public alertService: AlertService) {}
}
