import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetFormComponent } from './password-reset-form.component';
import { PasswordResetFormModule } from '../password-reset-form.module';
import { AbstractControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('PasswordResetFormComponent', () => {
    let component: PasswordResetFormComponent;
    let fixture: ComponentFixture<PasswordResetFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [ PasswordResetFormModule ]
    })
    .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordResetFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit event on submit', () => {
        jest.spyOn(component.formSubmitEvent, 'emit');
        component.resetPassword();
        expect(component.formSubmitEvent.emit).toHaveBeenCalled();
    });

    it('should return password and email abstract controls of form', () => {
        expect(component.newPassword).toBeInstanceOf(AbstractControl);
        expect(component.confirmPassword).toBeInstanceOf(AbstractControl);
    });

    it('should render two input elements', () => {
        const form = fixture.debugElement.nativeElement.querySelector('.app-form');
        const input = form.querySelectorAll('input');
        expect(input.length).toEqual(2);
    });

    it('should toggle state of password input on click', () => {
        expect(component.showNewPassword).toBeFalsy();
        fixture.debugElement.query(By.css('.toggleVisibilityIcon')).triggerEventHandler('click', null);
        expect(component.showNewPassword).toBeTruthy();
    });

    it('should set error to null when passwords match', () => {
        component.newPassword.setValue('testing');
        component.confirmPassword.setValue('testing');
        component.comparePasswords();
        expect(component.newPassword.errors).toBeNull();
    });

    it('should set error to mustMatch when passwords do not match', () => {
        component.newPassword.setValue('testing123');
        component.confirmPassword.setValue('testing');
        component.comparePasswords();
        expect(component.confirmPassword.errors).toEqual({ "mustMatch": true });
    });

    it('should set error when password has 5 or less characters', () => {
        component.newPassword.setValue('test');
        component.comparePasswords();
        expect(component.newPassword.errors).not.toBeNull();
    });

    it('should compare passwords on input event', () => {
        const spy = jest.spyOn(component, 'comparePasswords');
        const input = fixture.debugElement.query(By.css('input'))
        input.triggerEventHandler('input', { target: input.nativeElement });
        expect(spy).toHaveBeenCalled();
    });
});
