import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user: firebase.User | null = null;
    private readonly authState = new BehaviorSubject<firebase.User | null>(null);
    readonly authState$ = this.authState.asObservable();

    constructor(
        private auth: AngularFireAuth
    ) {
        this.auth.authState.subscribe(user => {
           if (user) {
               this.user = user;
               this.authState.next(user);
           } else {
               this.user = null;
               this.authState.next(null);
           }
        });
    }

    async register(email: string, password: string): Promise<void> {
        const userCredential =
            await this.auth.createUserWithEmailAndPassword(email, password);
        if (userCredential.user) {
            await userCredential.user.sendEmailVerification();
        }
    }

    async login(email: string, password: string): Promise<void> {
        await this.auth.signInWithEmailAndPassword(email, password);
    }

    async loginWithGoogle(): Promise<void> {
        await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    async resetPassword(email: string): Promise<void> {
        await this.auth.sendPasswordResetEmail(email);
    }

    /**
     * Verify the password reset code
     *
     * @param code {string} The code to verify
     */
    verifyPasswordResetCode(code: string): Promise<string> {
        return this.auth.verifyPasswordResetCode(code);
    }

    /**
     * Apply the code to the authenticated user
     *
     * @param code {string} The code to apply
     */
    applyActionCode(code: string): Promise<void> {
        return this.auth.applyActionCode(code);
    }

    /**
     * Confirms the password reset
     *
     * @param code {string} The code for the action
     * @param newPassword {string} The new password to set
     */
    confirmPasswordReset(code: string, newPassword: string): Promise<void> {
        return this.auth.confirmPasswordReset(code, newPassword);
    }

    async logout(): Promise<void> {
        await this.auth.signOut();
    }
}
