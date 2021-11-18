import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

describe('AuthServiceService', () => {
    let service: AuthService;
    const email = 'email';
    const password = 'password';
    const code = 'code';

    const angularFireAuthMock = {
        authState: of({}),
        signInWithEmailAndPassword: jest.fn(),
        signInWithPopup: jest.fn(),
        sendPasswordResetEmail: jest.fn(),
        verifyPasswordResetCode: jest.fn(),
        applyActionCode: jest.fn(),
        confirmPasswordReset: jest.fn(),
        signOut: jest.fn()
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AngularFireAuth,
                { provide: AngularFireAuth, useValue: angularFireAuthMock }
            ],
        });
        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call firebase auth signInWithEmailAndPassword in login method', () => {
        const spy = jest.spyOn(service, 'login');
        service.login(email, password);
        expect(spy).toHaveBeenCalledWith(email, password);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call firebase auth signInWithPopup in loginWithGoogle method', () => {
       const spy = jest.spyOn(service, 'loginWithGoogle');
       service.loginWithGoogle();
       expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call firebase auth sendPasswordResetEmail in resetPassword method', () => {
        const spy = jest.spyOn(service, 'resetPassword');
        service.resetPassword(email);
        expect(spy).toHaveBeenCalledWith(email);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call firebase auth applyActionCode in verifyPasswordResetCode method', () => {
       const spy = jest.spyOn(service, 'verifyPasswordResetCode');
       service.verifyPasswordResetCode(code);
       expect(spy).toHaveBeenCalledWith(code);
       expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call firebase auth confirmPasswordReset in confirmPasswordReset method', () => {
        const spy = jest.spyOn(service, 'confirmPasswordReset');
        service.confirmPasswordReset(code, password);
        expect(spy).toHaveBeenCalledWith(code, password);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call firebase auth signOut in logout method', () => {
        const spy = jest.spyOn(service, 'logout');
        service.logout();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
