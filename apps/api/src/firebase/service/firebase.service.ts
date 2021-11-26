import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class FirebaseService {
    getAuth = (): firebase.auth.Auth => firebase.auth();
    getUsers = (): Promise<firebase.auth.ListUsersResult> =>
        firebase.auth().listUsers();
    firestore = (): firebase.firestore.Firestore => getFirestore();
}
