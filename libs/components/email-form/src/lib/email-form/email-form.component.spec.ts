import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailFormComponent } from './email-form.component';
import { EmailFormModule } from '../email-form.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AbstractControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AuthService } from '@services';

describe('EmailFormComponent', () => {
    let component: EmailFormComponent;
    let fixture: ComponentFixture<EmailFormComponent>;

    const authServiceMock = {
        resetPassword: jest.fn()
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: AuthService, useValue: authServiceMock }
            ],
            imports: [
                EmailFormModule,
                FontAwesomeModule,
                RouterTestingModule.withRoutes([])
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmailFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit event on cancel', () => {
        jest.spyOn(component.cancelResetEvent, 'emit');
        component.cancelReset();
        expect(component.cancelResetEvent.emit).toHaveBeenCalled();
    });

    it('should return email abstract control from form', () => {
        expect(component.email).toBeInstanceOf(AbstractControl);
    });

    it('should render one input element', () => {
        const form =
            fixture.debugElement.nativeElement.querySelector('.app-form');
        const input = form.querySelectorAll('input');
        expect(input.length).toEqual(1);
    });

    it('should set error when email is wrongly formatted', () => {
        component.email.setValue('test');
        expect(component.email.errors).not.toBeNull();
    });

    it('should trigger reset password method on form submit', () => {
        const resetPasswordSpy = jest.spyOn(component, 'resetPassword');
        fixture.debugElement
            .query(By.css('.app-form'))
            .triggerEventHandler('ngSubmit', null);
        fixture.detectChanges();
        expect(resetPasswordSpy).toHaveBeenCalled();
    });

    it('should call auth service on password reset', () => {
        const authService = jest.spyOn(authServiceMock, 'resetPassword');
        component.resetPassword();
        expect(authService).toHaveBeenCalled();
    });
});
