import { Component } from '@angular/core';
import { AlertService } from '@integrationsprojekt2/services';

@Component({
    selector: 'integrationsprojekt2-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    constructor(
        public alertService: AlertService
    ) {}
}
