import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
@Component({
    selector: 'mate-team-register-form',
    template: '<p>Mock Register Form Component</p>',
})
class MockRegisterFormComponent {}

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegisterComponent, MockRegisterFormComponent],
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
        expect(fixture.debugElement.query(By.css('mate-team-register-form'))).not.toBeNull();
    });
});
