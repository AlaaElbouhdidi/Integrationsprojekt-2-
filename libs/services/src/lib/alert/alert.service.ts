import { Injectable } from '@angular/core';
import { Alert } from '@api-interfaces';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    /**
     * Array of global alerts
     */
    globalAlerts: Alert[] = [];

    /**
     * Removes first alert from array
     */
    removeAlert(): void {
        this.globalAlerts.shift();
    }

    /**
     * Adds alert to array
     * @param alert {Alert} The alert to add to array
     */
    addAlert(alert: Alert): void {
        this.globalAlerts.push(alert);
    }
}
