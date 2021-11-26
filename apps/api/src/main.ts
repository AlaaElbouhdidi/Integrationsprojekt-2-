import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getApp, expressInstance } from './utils/getApp';
import { UserRecord } from 'firebase-admin/auth';

if (!admin.apps.length) admin.initializeApp();

export const api = functions
    .region('europe-west1')
    .https.onRequest(async (request, response) => {
        await getApp().then((app) => app.init());
        expressInstance(request, response);
    });

export const createUser = functions
    .region('europe-west1')
    .auth.user()
    .onCreate((user: UserRecord) => {
        const { uid, displayName, email } = user;
        return admin
            .firestore()
            .collection('users')
            .doc(uid)
            .set({ uid, displayName, email });
    });

export const deleteUser = functions
    .region('europe-west1')
    .auth.user()
    .onDelete((user) => {
        return admin.firestore().collection('users').doc(user.uid).delete();
    });
