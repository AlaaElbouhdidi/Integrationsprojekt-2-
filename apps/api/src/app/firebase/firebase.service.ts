import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';

@Injectable()
export class FirebaseService {
    private firebaseApp: firebase.app.App;

    constructor() {
        if (firebase.apps.length === 0) {
            this.firebaseApp = firebase.initializeApp();
        }
    }

    getAuth = (): firebase.auth.Auth => {
        return this.firebaseApp.auth();
    };

    getUsers = (): Promise<firebase.auth.ListUsersResult> => {
        return this.firebaseApp.auth().listUsers();
    };

    firestore = (): firebase.firestore.Firestore => {
        return this.firebaseApp.firestore();
    };
}
