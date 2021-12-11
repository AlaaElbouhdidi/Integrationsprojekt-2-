import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingpageComponent } from './landingpage.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LandingpageModule } from '../landingpage.module';
import { RouterTestingModule } from '@angular/router/testing'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    selector: 'mate-team-slideshow',
    template: '<p>Mock Slideshow Component</p>'
})
class MockSlideshowComponent {}

describe('LandingpageComponent', () => {
    let component: LandingpageComponent;
    let fixture: ComponentFixture<LandingpageComponent>;
    const mockUser = {
        user: {
            email: 'email',
            displayName: '',
            sendEmailVerification: jest.fn()
        }
    };

    const angularFireAuthMock = {
        authState: of(mockUser),
        createUserWithEmailAndPassword: jest.fn(),
        sendEmailVerification: jest.fn(),
        signInWithEmailAndPassword: jest.fn(),
        signInWithPopup: jest.fn(),
        sendPasswordResetEmail: jest.fn(),
        verifyPasswordResetCode: jest.fn(),
        applyActionCode: jest.fn(),
        confirmPasswordReset: jest.fn(),
        signOut: jest.fn()
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LandingpageModule, RouterTestingModule, BrowserAnimationsModule],
            declarations: [MockSlideshowComponent],
            providers: [
                AngularFireAuth,
                { provide: AngularFireAuth, useValue: angularFireAuthMock }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LandingpageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render slideshow', () => {
        expect(
            fixture.debugElement.query(By.css('mate-team-slideshow'))
        ).not.toBeNull();
    });
});
