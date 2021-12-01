import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'mate-team-login-form',
    template: '<p>Mock Login Form Component</p>',
})
class MockLoginFormComponent {}

@Component({
    selector: 'mate-team-email-form',
    template: '<p>Mock Email Form Component</p>',
})
class MockEmailFormComponent {}

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                LoginComponent,
                MockLoginFormComponent,
                MockEmailFormComponent,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render login form', () => {
        expect(component.showLogin).toBeTruthy();
        expect(
            fixture.debugElement.query(By.css('mate-team-login-form'))
        ).not.toBeNull();
    });
});
