import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
/**
 * The FirebaseService
 **/
@Injectable()
export class FirebaseService {
    /**
     * The method that returns the firebase-admin auth module
     * @returns {firebase.auth.Auth} Firebase Auth
     **/
    getAuth = (): firebase.auth.Auth => firebase.auth();
    /**
     * The method that returns the firebase-admin firestore module
     * @returns {firebase.firestore.Firestore} Firebase Firestore
     **/
    getFirestore = (): firebase.firestore.Firestore => firebase.firestore();
    /**
     * The method that performs the firebase-admin auth listUsers() method and returns the result
     * @returns {Promise<firebase.auth.ListUsersResult>} Users
     **/
    getUsers = async (): Promise<firebase.auth.ListUsersResult> =>
        await firebase.auth().listUsers();
}
