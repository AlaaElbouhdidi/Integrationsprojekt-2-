import { Injectable } from '@angular/core';
import { User } from '@api-interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
     */
    constructor(private afs: AngularFirestore) {}

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
                        displayName: doc.get('displayName')
                    };
                });
            });
        return user;
    }
}
