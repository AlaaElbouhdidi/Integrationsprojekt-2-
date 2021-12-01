import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterFormComponent } from './register-form.component';
import { RegisterFormModule } from '../register-form.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@services';
import { AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';

describe('RegisterFormComponent', () => {
    let component: RegisterFormComponent;
    let fixture: ComponentFixture<RegisterFormComponent>;

    const authServiceMock = {
        register: jest.fn(),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: AuthService, useValue: authServiceMock },
            ],
            imports: [
                FontAwesomeModule,
                RegisterFormModule,
                RouterTestingModule.withRoutes([]),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterFormComponent);
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

    it('should call auth service register method', () => {
        const spy = jest.spyOn(authServiceMock, 'register');
        component.register();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should redirect to landing page after successful register', () => {
        const location = TestBed.inject(Location);
        component.register().then(() => {
            expect(location.path()).toBe('/');
        });
    });
});
