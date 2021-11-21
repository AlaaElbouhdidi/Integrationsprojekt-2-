import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';
import { getAuth } from "firebase/auth";
import { User } from "@api-interfaces";

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
                displayName: displayName
            }
    }
    throw new Error();
}
}
