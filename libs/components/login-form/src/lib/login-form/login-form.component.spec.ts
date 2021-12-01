import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginFormModule } from '../login-form.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@services';
import { AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';

describe('LoginFormComponent', () => {
    let component: LoginFormComponent;
    let fixture: ComponentFixture<LoginFormComponent>;

    const authServiceMock = {
        login: jest.fn(),
        loginWithGoogle: jest.fn(),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: AuthService, useValue: authServiceMock },
            ],
            imports: [
                FontAwesomeModule,
                LoginFormModule,
                RouterTestingModule.withRoutes([]),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return abstract control of email and password', () => {
        expect(component.email).toBeInstanceOf(AbstractControl);
        expect(component.password).toBeInstanceOf(AbstractControl);
    });

    it('should render two input elements', () => {
        const form =
            fixture.debugElement.nativeElement.querySelector('.app-form');
        const input = form.querySelectorAll('input');
        expect(input.length).toEqual(2);
    });

    it('should set error when email is wrongly formatted', () => {
        component.email.setValue('test');
        expect(component.email.errors).not.toBeNull();
    });

    it('should set error when password has less than six characters', () => {
        component.password.setValue('test');
        expect(component.password.errors).not.toBeNull();
    });

    it('should emit event', () => {
        jest.spyOn(component.showEmailFormEvent, 'emit');
        component.resetPassword();
        expect(component.showEmailFormEvent.emit).toHaveBeenCalled();
    });

    it('should call auth service method login with google', () => {
        const loginWithGoogle = jest.spyOn(authServiceMock, 'loginWithGoogle');
        component.loginWithGoogle();
        expect(loginWithGoogle).toHaveBeenCalledTimes(1);
    });

    it('should redirect to landing page after successful google login', () => {
        const location = TestBed.inject(Location);
        component.loginWithGoogle().then(() => {
            expect(location.path()).toBe('/');
        });
    });

    it('should call auth service method login', () => {
        const login = jest.spyOn(authServiceMock, 'login');
        component.login();
        expect(login).toHaveBeenCalledTimes(1);
    });

    it('should redirect to landing page after successful login', () => {
        const location = TestBed.inject(Location);
        component.login().then(() => {
            expect(location.path()).toBe('/');
        });
    });
});
