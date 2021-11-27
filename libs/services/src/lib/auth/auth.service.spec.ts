import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

describe('AuthServiceService', () => {
    let service: AuthService;
    const email = 'email';
    const password = 'password';
    const code = 'code';
    const mockUser = {
        user: {
            email: 'email',
            displayName: '',
            sendEmailVerification: jest.fn(),
        },
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
        signOut: jest.fn(),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AngularFireAuth,
                { provide: AngularFireAuth, useValue: angularFireAuthMock },
            ],
        });
        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set user in constructor', () => {
        angularFireAuthMock.authState.subscribe((user) => {
            expect(user).toBe(mockUser);
            expect(service.user).toBe(user);
        });
    });

    it('should set current user in authState$ observable', () => {
        service.authState$.subscribe((user) => {
            expect(user).toBe(mockUser);
        });
    });

    it('should call firebase auth createUserWithEmailAndPassword in register method', () => {
        const spy = jest.spyOn(
            angularFireAuthMock,
            'createUserWithEmailAndPassword'
        );
        angularFireAuthMock.createUserWithEmailAndPassword.mockReturnValue(
            mockUser
        );
        service.register(email, password);
        expect(spy).toHaveBeenCalledWith(email, password);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call firebase auth signInWithEmailAndPassword in login method', () => {
        const spy = jest.spyOn(
            angularFireAuthMock,
            'signInWithEmailAndPassword'
        );
        service.login(email, password);
        expect(spy).toHaveBeenCalledWith(email, password);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call firebase auth signInWithPopup in loginWithGoogle method', () => {
        const spy = jest.spyOn(angularFireAuthMock, 'signInWithPopup');
        service.loginWithGoogle();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call firebase auth sendPasswordResetEmail in resetPassword method', () => {
        const spy = jest.spyOn(angularFireAuthMock, 'sendPasswordResetEmail');
        service.resetPassword(email);
        expect(spy).toHaveBeenCalledWith(email);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call firebase auth verifyPasswordResetCode in verifyPasswordResetCode method', () => {
        const spy = jest.spyOn(angularFireAuthMock, 'verifyPasswordResetCode');
        service.verifyPasswordResetCode(code);
        expect(spy).toHaveBeenCalledWith(code);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call firebase auth applyActionCode in applyActionCode method', () => {
        const spy = jest.spyOn(angularFireAuthMock, 'applyActionCode');
        service.applyActionCode(code);
        expect(spy).toHaveBeenCalledWith(code);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call firebase auth confirmPasswordReset in confirmPasswordReset method', () => {
        const spy = jest.spyOn(angularFireAuthMock, 'confirmPasswordReset');
        service.confirmPasswordReset(code, password);
        expect(spy).toHaveBeenCalledWith(code, password);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call firebase auth signOut in logout method', () => {
        const spy = jest.spyOn(angularFireAuthMock, 'signOut');
        service.logout();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
