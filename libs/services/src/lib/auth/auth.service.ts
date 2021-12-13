import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { EmailAuthProvider, getAuth } from 'firebase/auth';
import { User } from '@api-interfaces';
import firebase from 'firebase/compat/app';

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
        this.auth.authState.subscribe(async (user) => {
            if (user) {
                this.user = user;
                const token = await user.getIdToken(true);
                localStorage.setItem('idToken', token);
                this.authState.next(user);
            } else {
                this.user = null;
                localStorage.clear();
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
            const token = await userCredential.user.getIdToken(true);
            localStorage.setItem('idToken', token);
        }
    }

    /**
     * Login the user with email and password
     *
     * @param email {string} The email of the user
     * @param password {string} The password of the user
     */
    async login(email: string, password: string): Promise<void> {
        const user = await this.auth.signInWithEmailAndPassword(
            email,
            password
        );
        if (user.user) {
            const token = await user.user.getIdToken(true);
            localStorage.setItem('idToken', token);
        }
    }

    /**
     * Login user with google credentials
     */
    async loginWithGoogle(): Promise<void> {
        const user = await this.auth.signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        );
        if (user.user) {
            const token = await user.user.getIdToken(true);
            localStorage.setItem('idToken', token);
        }
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
        localStorage.clear();
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
    async emailIsAlreadyRegistred(email: string): Promise<number>{ 
        const res = await firebase.auth().fetchSignInMethodsForEmail(email)
        .then((signInMethods) => {
            // This returns the same array as fetchProvidersForEmail but for email
            // provider identified by 'password' string, signInMethods would contain 2
            // different strings:
            // 'emailLink' if the user previously signed in with an email/link
            // 'password' if the user has a password.
            // A user could have both.
            if (signInMethods.indexOf(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) != -1) {
              // User can sign in with email/password.
              return 0;
            }
            else{
                if (signInMethods.indexOf(EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD) != -1) {
                // User can sign in with email/link.
                return 1;
                }
                else {
                // User doesnt exi
                return -1
              }
            }
            
          })
          .catch((error) => {
            // Some error occurred, you can inspect the code: error.code
            console.log(error);
          });
            return Number(res);
    }
}
