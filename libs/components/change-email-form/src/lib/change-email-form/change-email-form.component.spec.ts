import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailFormComponent } from './change-email-form.component';
import { ChangeEmailFormModule } from '../change-email-form.module';
import { AbstractControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ChangeEmailFormComponent', () => {
    let component: ChangeEmailFormComponent;
    let fixture: ComponentFixture<ChangeEmailFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ ChangeEmailFormModule ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeEmailFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return abstract control of password and new email', () => {
       expect(component.password).toBeInstanceOf(AbstractControl);
       expect(component.newEmail).toBeInstanceOf(AbstractControl);
    });

    it('should render two input elements', () => {
       const form = fixture.debugElement.nativeElement.querySelector('form');
       const input = form.querySelectorAll('input');
       expect(input.length).toEqual(2);
    });

    it('should set error when password is empty', () => {
        component.password.setValue('');
        expect(component.password.errors).not.toBeNull();
    });

    it('should set error when email is wrongly formatted', () => {
        component.newEmail.setValue('test');
        expect(component.newEmail.errors).not.toBeNull();
    });

    it('should emit event on form submit', () => {
        jest.spyOn(component.changeEmailEvent, 'emit');
        component.changeEmail();
        expect(component.changeEmailEvent.emit).toHaveBeenCalled();
    });

    it('should reset form on form submit', () => {
       jest.spyOn(component.changeEmailForm, 'reset');
       component.changeEmail();
       expect(component.changeEmailForm.reset).toHaveBeenCalled();
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
