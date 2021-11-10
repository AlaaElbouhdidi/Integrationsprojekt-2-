import { Component, OnDestroy } from '@angular/core';
import { AlertService } from '@integrationsprojekt2/services';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'integrationsprojekt2-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    animations: [
        trigger('alertAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(-2rem)' }),
                animate(
                    '200ms',
                    style({ opacity: 1, transform: 'translateY(0)' })
                ),
            ]),
            transition(':leave', [
                style({ transform: 'translateY(0)' }),
                animate(
                    '200ms',
                    style({ opacity: 0, transform: 'translateY(-2rem)' })
                ),
            ]),
        ]),
    ],
})
export class RegisterComponent implements OnDestroy {
    constructor(public alertService: AlertService) {}

    ngOnDestroy(): void {
        this.alertService.reset();
    }
}
