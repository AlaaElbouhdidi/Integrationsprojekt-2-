import { Injectable } from '@angular/core';
import { User } from '@api-interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';

/**
 * User service
 */
@Injectable({
    providedIn: 'root'
})
export class UserService {
    /**
     * Constructor of user service
     * @param afs {AngularFirestore}
     * @param authService {AuthService}
     */
    constructor(
        private afs: AngularFirestore,
        private authService: AuthService
    ) {}

    async getUser(email: string): Promise<User> {
        let user: User = {} as User;
        await this.afs
            .collection<User>('users')
            .ref.where('email', '==', email)
            .get()
            .then((qs) => {
                qs.forEach((doc) => {
                    user = {
                        uid: doc.id,
                        email: doc.get('email'),
                        photoURL: doc.get('photoURL'),
                        displayName: doc.get('displayName'),
                        invitations: doc.get('invitations')
                    };
                });
            });
        return user;
    }

    async getUserByUid(uid: string): Promise<User> {
        let user: User = {} as User;
        await this.afs
            .collection<User>('users')
            .doc(uid)
            .ref.get()
            .then((doc) => {
                if (doc.data()) {
                    user = {
                        uid: doc.id,
                        email: doc.get('email'),
                        photoURL: doc.get('photoURL'),
                        displayName: doc.get('displayName')
                    };
                }
            });
        return user;
    }

    async sendUserGroupInvitation(user: User, groupId: string) {
        let { invitations } = user;
        if (!invitations) {
            invitations = [];
        }
        await this.afs
            .collection('users')
            .doc(user.uid)
            .set(
                {
                    invitations: [...invitations, groupId]
                },
                { merge: true }
            );
    }

    async declineUserGroupInvitation(groupId: string): Promise<void> {
        console.log('decline');
    }

    async acceptUserGroupInvitation(): Promise<void> {
        console.log('accept');
    }

    async updateProfile(
        uid: string,
        displayName?: string,
        photoURL?: string
    ): Promise<void> {
        await this.afs.collection<User>('users').doc(uid).update({
            displayName: displayName,
            photoURL: photoURL
        });
    }
}
