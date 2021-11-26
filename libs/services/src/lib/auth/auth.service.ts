import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';
import { getAuth } from 'firebase/auth';
import { User } from '@api-interfaces';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    /**
     * Firebase user object
     */
    user: firebase.User | null = null;
    /**
     * Auth state Subject
     * @private
     */
    private readonly authState = new BehaviorSubject<firebase.User | null>(
        null
    );
    /**
     * Auth state observable
     */
    readonly authState$ = this.authState.asObservable();

    /**
     * Constructor of auth service
     * @param auth {AngularFireAuth}
     */
    constructor(private auth: AngularFireAuth) {
        this.auth.authState.subscribe((user) => {
            if (user) {
                this.user = user;
                this.authState.next(user);
            } else {
                this.user = null;
                this.authState.next(null);
            }
        });
    }

    /**
     * Creates new user with email and password and sends email verification link
     * @param email {string} The email of the user
     * @param password {string} The password of the user
     */
    async register(email: string, password: string): Promise<void> {
        const userCredential = await this.auth.createUserWithEmailAndPassword(
            email,
            password
        );
        if (userCredential.user) {
            await userCredential.user.sendEmailVerification();
        }
    }

    /**
     * Login the user with email and password
     *
     * @param email {string} The email of the user
     * @param password {string} The password of the user
     */
    async login(email: string, password: string): Promise<void> {
        await this.auth.signInWithEmailAndPassword(email, password);
    }

    /**
     * Login user with google credentials
     */
    async loginWithGoogle(): Promise<void> {
        await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    /**
     * Send password reset email link to user
     *
     * @param email {string} The email to send the reset link to
     */
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

    /**
     * Logout a user
     */
    async logout(): Promise<void> {
        await this.auth.signOut();
    }

    getCurrentUser(): User {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
            // The user object has basic properties such as display name, email, etc.
            const displayName = user.displayName || '';
            const email = user.email || '';
            const photoURL = user.photoURL || '';
            const emailVerified = user.emailVerified;

            // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            const uid = user.uid;
            return {
                id: uid,
                email: email,
                photoURL: photoURL,
                emailVerified: emailVerified,
                displayName: displayName,
            };
        }
        throw new Error();
    }
}
