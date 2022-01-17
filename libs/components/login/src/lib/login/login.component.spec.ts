import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    selector: 'mate-team-email-form',
    template: '<p>Mock Email Form Component</p>'
})
class MockEmailFormComponent {}
@Component({
    selector: 'mate-team-bg-animation',
    template: '<p>Mock Bg Animation Component</p>'
})
class MockBgAnimationComponent {}
@Component({
    selector: 'mate-team-login-form',
    template: '<p>Mock Login Form Component</p>'
})
class MockLoginFormComponent {}

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                LoginComponent,
                MockEmailFormComponent,
                MockBgAnimationComponent,
                MockLoginFormComponent
            ],
            imports: [BrowserAnimationsModule]
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
