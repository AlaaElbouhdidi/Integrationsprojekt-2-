import { Injectable } from '@angular/core';
import { Alert } from '@integrationsprojekt2/api-interfaces';

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

    reset(): void {
        this.globalAlerts = [];
    }
}
