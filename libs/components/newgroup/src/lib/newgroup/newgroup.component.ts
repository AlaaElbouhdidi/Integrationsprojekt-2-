import { Component } from '@angular/core';
import { AlertService } from '@services';

@Component({
    selector: 'mate-team-newgroup',
    templateUrl: './newgroup.component.html',
    styleUrls: ['./newgroup.component.scss']
})
export class NewgroupComponent {
    success = false;

    constructor(public alertService: AlertService) {}
}
