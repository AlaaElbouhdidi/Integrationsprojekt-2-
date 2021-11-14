import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';

@Injectable()
export class FirebaseService {
    getAuth = (): firebase.auth.Auth => firebase.auth()
    getUsers = (): Promise<firebase.auth.ListUsersResult> => firebase.auth().listUsers()
    firestore = (): firebase.firestore.Firestore => firebase.firestore()
}
