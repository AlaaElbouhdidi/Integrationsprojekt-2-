import { Injectable } from '@angular/core';
import { Group, Member, User } from '@api-interfaces';
import {
    AngularFirestore,
    AngularFirestoreCollection
} from '@angular/fire/compat/firestore';

import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

/**
 * Group service
 */
@Injectable({
    providedIn: 'root'
})
export class GroupService {
    /**
     * ID of the current group
     */
    currentGroupId = '';
    groupCollection: AngularFirestoreCollection<Group>;

    private success = false;
    private subject = new BehaviorSubject<string>('');

    /**
     * Constructor of group service
     * @param afs {AngularFirestore}
     */
    constructor(public afs: AngularFirestore, public authService: AuthService) {
        this.groupCollection = this.afs.collection('groups');
    }

    /**
     * Get a group by id
     *
     * @param groupId {string} The id of the group to get
     * @returns {Promise<Group | undefined>} A Promise containing the group or undefined if no group found
     */
    getGroupById(groupId: string): Promise<Group | undefined> {
        return this.afs
            .collection<Group>('groups')
            .doc(groupId)
            .ref.get()
            .then((group) => group.data());
    }
    // getOwnedGroups() {
    //     const { uid } = this.authService.getCurrentUser();
    //     const groupCollection = this.afs.collection<Group>('groups', (ref) =>
    //         ref.where('admin', '==', uid)
    //     );
    //     return groupCollection.snapshotChanges().pipe(
    //         map((groups) =>
    //             groups.map((g) => {
    //                 const data = g.payload.doc.data() as Group;
    //                 const id = g.payload.doc.id;
    //                 const group: Group = { id, ...data };
    //                 console.log(group);
    //                 return group;
    //             })
    //         )
    //     );
    // }
    async getUserGroups() {
        const { uid } = this.authService.getCurrentUser();
        const user = (
            await this.afs.collection(`/users`).doc<User>(uid).ref.get()
        ).data();
        const userGroups: Group[] = [];
        if (user) {
            const { groups } = user;
            if (!groups) {
                return [];
            }
            groups.forEach(async (groupId) => {
                const group = (
                    await this.groupCollection.doc(groupId).ref.get()
                ).data();
                if (group) {
                    userGroups.push({...group, id: groupId});
                }
            });
        } else {
            return [];
        }
        return userGroups;
    }

    toggleSuccess(gid: string): void {
        if (gid != '') {
            this.success = true;
        }
        this.subject.next(gid);
    }
    onToggle(): Observable<string> {
        return this.subject.asObservable();
    }

    async addNewGroup(g: Group, m: Member): Promise<string> {
        const groupId = await this.groupCollection.add(g).then((ref) => {
            this.groupCollection
                .doc(ref.id)
                .collection('members')
                .doc(m.email)
                .set(m);
            return ref.id;
        });
        const { uid } = this.authService.getCurrentUser();
        const user = (
            await this.afs.collection(`/users`).doc<User>(uid).ref.get()
        ).data();
        if (user) {
            let { groups } = user;
            if (!groups) {
                groups = [];
            }
            await this.afs
                .collection(`/users`)
                .doc(uid)
                .set(
                    {
                        groups: [...groups, groupId]
                    },
                    { merge: true }
                );
        }
        return groupId;
    }
    async addMemberToGroup(gid: string, m: Member): Promise<void> {
        this.groupCollection.doc(gid).collection('members').doc(m.email).set(m);
    }
    async isAlreadyMember(gid: string, email: string): Promise<boolean> {
        const q = await this.afs
            .collection('groups/' + gid + '/members/')
            .ref.where('email', '==', email)
            .get()
            .then((qs) => {
                if (qs.size > 0) return true;
                else return false;
            });
        return q;
    }
    getAllMembers(gid: string): Observable<Member[]> {
        return this.afs
            .collection<Member>(`groups/${gid}/members`)
            .valueChanges({ idField: 'id' });
    }
    deleteMember(gid: string, m: Member) {
        this.afs
            .collection<Member>(`groups/${gid}/members`)
            .doc(m.email)
            .delete();
    }
    toggleIsAdmin(gid: string, m: Member) {
        this.afs
            .collection<Member>(`groups/${gid}/members`)
            .doc(m.email)
            .update({ isAdmin: !m.isAdmin });
    }
}
