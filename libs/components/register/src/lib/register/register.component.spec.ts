import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    selector: 'mate-team-register-form',
    template: '<p>Mock Register Form Component</p>'
})
class MockRegisterFormComponent {}
@Component({
    selector: 'mate-team-bg-animation',
    template: '<p>Mock Background Animation Component</p>'
})
class MockBgAnimationComponent {}

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                RegisterComponent,
                MockRegisterFormComponent,
                MockBgAnimationComponent,
                BrowserAnimationsModule
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render register form', () => {
        expect(
            fixture.debugElement.query(By.css('mate-team-register-form'))
        ).not.toBeNull();
    });
});
