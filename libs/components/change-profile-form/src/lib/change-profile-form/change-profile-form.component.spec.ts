import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeProfileFormComponent } from './change-profile-form.component';
import { ChangeProfileFormModule } from '../change-profile-form.module';
import { AbstractControl } from '@angular/forms';
import { IconService } from '@services';
import { By } from '@angular/platform-browser';

describe('ChangeProfileFormComponent', () => {
    let component: ChangeProfileFormComponent;
    let fixture: ComponentFixture<ChangeProfileFormComponent>;

    const iconServiceMock = {
        getIcons: jest.fn().mockReturnValue(['user']),
        decodeIconString: jest.fn().mockReturnValue(['user', '#ffffff', '#ffffff']),
        encodeIconString: jest.fn().mockReturnValue('user/#ffffff/#ffffff')
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                { provide: IconService, useValue: iconServiceMock }
            ],
            imports: [ ChangeProfileFormModule ],
            declarations: [ChangeProfileFormComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeProfileFormComponent);
        component = fixture.componentInstance;
        component.previewIcon = '';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return abstract control of icon color, icon background and display name', () => {
       expect(component.iconColor).toBeInstanceOf(AbstractControl);
       expect(component.iconBackground).toBeInstanceOf(AbstractControl);
       expect(component.displayName).toBeInstanceOf(AbstractControl);
    });

    it('should render three input elements', () => {
        const form = fixture.debugElement.nativeElement.querySelector('form');
        const input = form.querySelectorAll('input');
        expect(input.length).toEqual(3);
    });

    it('should set error when display name is longer than 15 characters', () => {
        component.displayName.setValue('over15characterlongdisplayname');
        expect(component.displayName.errors).not.toBeNull();
    });

    it('should emit event on form submit', () => {
        jest.spyOn(component.changeProfileEvent, 'emit');
        component.changeProfile();
        expect(component.changeProfileEvent.emit).toHaveBeenCalled();
    });

    it('should call update preview icon on icon change', () => {
        const spy = jest.spyOn(component, 'updatePreviewIcon');
        component.nextIcon();
        component.previousIcon();
        expect(spy).toHaveBeenCalledTimes(2);
    })

    it('should call icon service on update preview icon', () => {
        const spy = jest.spyOn(iconServiceMock, 'encodeIconString');
        component.updatePreviewIcon();
        expect(spy).toHaveBeenCalled();
    });

    it('should call icon service to encode string when user icon string is empty and reset form', () => {
        const spy = jest.spyOn(iconServiceMock, 'encodeIconString');
        const compSpy = jest.spyOn(component.changeProfileForm, 'reset');
        expect(component.userIconString.length).toBe(0);
        component.ngOnInit();
        expect(spy).toHaveBeenCalled();
        expect(compSpy).toHaveBeenCalled();
    });

    it('should call icon service to decode string when user icon string is not empty and reset form', () => {
       const spy = jest.spyOn(iconServiceMock, 'decodeIconString');
       const compSpy = jest.spyOn(component.changeProfileForm, 'reset');
       component.userIconString = 'user/#ffffff/#ffffff';
       fixture.detectChanges();
       expect(component.userIconString.length).not.toBe(0);
       component.ngOnInit();
       expect(spy).toHaveBeenCalled();
       expect(compSpy).toHaveBeenCalled();
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
