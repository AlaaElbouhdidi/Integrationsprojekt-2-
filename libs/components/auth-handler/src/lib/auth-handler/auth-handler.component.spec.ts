import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthHandlerComponent } from './auth-handler.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@services';
import { LoginModule } from '@login';
import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'mate-team-password-reset-form',
    template: '<p>Mock Password Reset Form Component</p>',
})
class MockPasswordResetFormComponent {}

describe('AuthHandlerComponent', () => {
    let component: AuthHandlerComponent;
    let fixture: ComponentFixture<AuthHandlerComponent>;

    const authServiceMock = {
        applyActionCode: jest.fn(),
        confirmPasswordReset: jest.fn(),
        verifyPasswordResetCode: jest.fn(),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: AuthService, useValue: authServiceMock },
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'login', component: LoginModule },
                ]),
            ],
            declarations: [
                AuthHandlerComponent,
                MockPasswordResetFormComponent,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthHandlerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should trigger unsubscribe on destroy', () => {
        jest.spyOn(component['unsubscribe$'], 'next');
        jest.spyOn(component['unsubscribe$'], 'complete');
        component.ngOnDestroy();
        expect(component['unsubscribe$'].next).toHaveBeenCalledTimes(1);
        expect(component['unsubscribe$'].complete).toHaveBeenCalledTimes(1);
    });

    it('should apply action code in handleVerifyEmail method and redirect to landing page', () => {
        const location = TestBed.inject(Location);
        const verifySpy = jest.spyOn(authServiceMock, 'applyActionCode');
        component.handleVerifyEmail().then(() => {
            expect(location.path()).toBe('/');
            expect(verifySpy).toHaveBeenCalledTimes(1);
        });
    });

    it('should confirm password reset in handler function and redirect to login page on success', () => {
        const location = TestBed.inject(Location);
        const confirmPasswordResetSpy = jest.spyOn(
            authServiceMock,
            'confirmPasswordReset'
        );
        component.handlePasswordReset('test').then(() => {
            expect(location.path()).toBe('/login');
            expect(confirmPasswordResetSpy).toHaveBeenCalledTimes(1);
        });
    });

    it('should call verify password reset code in verifyCode method', () => {
        const verifyCodeSpy = jest.spyOn(
            authServiceMock,
            'verifyPasswordResetCode'
        );
        component.handleVerifyCode().then(() => {
            expect(verifyCodeSpy).toHaveBeenCalled();
        });
    });
});
