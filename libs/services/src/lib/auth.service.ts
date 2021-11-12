import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
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
        try {
            const userCredential =
                await this.auth.createUserWithEmailAndPassword(email, password);
            if (userCredential.user) {
                await userCredential.user.sendEmailVerification();
            }
        } catch (e: any) {
            throw e;
        }
    }

    async login(email: string, password: string): Promise<void> {
        try {
            await this.auth.signInWithEmailAndPassword(email, password);
        } catch (e) {
            throw e;
        }
    }

    async loginWithGoogle(): Promise<void> {
        try {
            await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        } catch (e) {
            throw e;
        }
    }

    async logout(): Promise<void> {
        try {
            await this.auth.signOut();
        } catch (e) {
            throw e;
        }
    }
}
