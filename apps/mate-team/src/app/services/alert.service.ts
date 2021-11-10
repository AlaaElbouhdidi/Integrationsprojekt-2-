import { Injectable } from '@angular/core';
import { Alert } from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

    globalAlerts: Alert[] = [];

    constructor() { }

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
