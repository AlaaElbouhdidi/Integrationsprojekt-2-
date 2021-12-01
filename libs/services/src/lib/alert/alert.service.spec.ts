import { TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';
import { Alert } from '@api-interfaces';

describe('AlertServiceService', () => {
    let service: AlertService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AlertService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should remove first alert in array', () => {
        service.globalAlerts = [
            {
                message: 'test alert',
                type: 'success',
            },
        ];
        service.removeAlert();
        expect(service.globalAlerts).toEqual([]);
    });

    it('should add alert to array', () => {
        const mockAlert: Alert = {
            message: 'add alert test',
            type: 'success',
        };
        service.addAlert(mockAlert);
        expect(service.globalAlerts).toEqual([mockAlert]);
    });
});
