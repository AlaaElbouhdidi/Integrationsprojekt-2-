import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertModule } from '../alert.module';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
    let component: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AlertModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AlertComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set 5000ms as default for remaining time', () => {
        expect(component.remainingTime).toEqual(5000);
    });

    it('should call removeAlertAfterTime after the view inits', () => {
        const spy = jest.spyOn(component, 'removeAlertAfterTime');
        component.ngAfterViewInit();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('removes alert after given remaining Time', () => {
        jest.useFakeTimers();
        jest.spyOn(global, 'setInterval');
        component.removeAlertAfterTime();
        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenLastCalledWith(
            expect.any(Function),
            component.remainingTime
        );
    });
});
