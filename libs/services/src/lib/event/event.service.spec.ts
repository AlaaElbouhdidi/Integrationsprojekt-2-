import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';
import { EventService } from './event.service';

describe('EventServiceService', () => {
    let service: EventService;
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

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                AngularFireAuth,
                { provide: AngularFireAuth, useValue: angularFireAuthMock }
            ]
        });
        service = TestBed.inject(EventService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
