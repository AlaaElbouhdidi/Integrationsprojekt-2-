import { Injectable } from '@angular/core';
import { Alert } from '@api-interfaces';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    globalAlerts: Alert[] = [];

    removeAlert(): void {
        this.globalAlerts.shift();
    }

    addAlert(alert: Alert): void {
        this.globalAlerts.push(alert);
    }
}
