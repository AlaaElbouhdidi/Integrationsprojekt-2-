import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePasswordFormComponent } from './change-password-form.component';
import { ChangePasswordFormModule } from '../change-password-form.module';
import { AbstractControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ChangePasswordFormComponent', () => {
    let component: ChangePasswordFormComponent;
    let fixture: ComponentFixture<ChangePasswordFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChangePasswordFormModule],
            declarations: [ChangePasswordFormComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangePasswordFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return password, new password and confirm password abstract controls of form', () => {
        expect(component.password).toBeInstanceOf(AbstractControl);
        expect(component.newPassword).toBeInstanceOf(AbstractControl);
        expect(component.confirmNewPassword).toBeInstanceOf(AbstractControl);
    });

    it('should render three input elements', () => {
        const form = fixture.debugElement.nativeElement.querySelector('form');
        const input = form.querySelectorAll('input');
        expect(input.length).toEqual(3);
    });

    it('should set error to mustMatch when passwords do not match', () => {
        component.newPassword.setValue('testing123');
        component.confirmNewPassword.setValue('testing');
        component.comparePasswords();
        expect(component.confirmNewPassword.errors).toEqual({
            mustMatch: true
        });
    });

    it('should set error to null when passwords match', () => {
        component.newPassword.setValue('testing');
        component.confirmNewPassword.setValue('testing');
        component.comparePasswords();
        expect(component.newPassword.errors).toBeNull();
    });

    it('should set error when new password has 5 or less characters', () => {
        component.newPassword.setValue('test');
        expect(component.newPassword.errors).not.toBeNull();
    });

    it('should emit event on form submit', () => {
        jest.spyOn(component.changePasswordEvent, 'emit');
        component.changePassword();
        expect(component.changePasswordEvent.emit).toHaveBeenCalled();
    });

    it('should reset form on form submit', () => {
        jest.spyOn(component.changePasswordForm, 'reset');
        component.changePassword();
        expect(component.changePasswordForm.reset).toHaveBeenCalled();
    });

    it('should render loading spinner while loading and hide submit form button', () => {
        component.loading = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.loader'))).not.toBeNull();
        expect(fixture.debugElement.query(By.css('.green-btn'))).toBeNull();
    });

    it('should render form submit button while not loading and hide loading spinner', () => {
        component.loading = false;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.loader'))).toBeNull();
        expect(fixture.debugElement.query(By.css('.green-btn'))).not.toBeNull();
    });
});
