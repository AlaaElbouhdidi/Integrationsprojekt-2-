import { Injectable } from '@angular/core';
import { Group, Member } from '@api-interfaces';
import {
    AngularFirestore,
    AngularFirestoreCollection
} from '@angular/fire/compat/firestore';

import { BehaviorSubject, map, Observable } from 'rxjs';

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
    constructor(public afs: AngularFirestore) {
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
            .ref
            .get()
            .then(group => group.data());
    }

    toggleSuccess( gid: string): void {
        if (gid != '') {this.success = true;}
        this.subject.next(gid);
    }
    onToggle(): Observable<string> {
        return this.subject.asObservable();
    }

    async addNewGroup(g: Group, m: Member): Promise<string> {
        const ref = await this.groupCollection.add(g).then((ref) => {
           this.groupCollection
            .doc(ref.id)
            .collection('members')
            .doc(m.email)
            .set(m);
        return ref.id;
        });

        return ref;
    }
    async addMemberToGroup(gid: string, m: Member): Promise<void> {
        this.groupCollection
            .doc(gid)
            .collection('members')
            .doc(m.email)
            .set(m);
    }
    async isAlreadyMember(gid: string, email: string): Promise<boolean> {
        const q = await this.afs.collection('groups/'+gid+'/members/').ref.where("email", '==', email).get().then((qs) => {
            if (qs.size > 0) return true;
            else return false
        })
        return q;
    }
     getAllMembers(gid: string): Observable<Member[]>{
        return this.afs.collection<Member>(`groups/${gid}/members`).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() as Member;
              return {...data};
            }))
        );
    }
    deleteMember(gid: string, m: Member){
         this.afs.collection<Member>(`groups/${gid}/members`).doc(m.email).delete();
    }
    toggleIsAdmin(gid: string, m: Member){
        this.afs.collection<Member>(`groups/${gid}/members`).doc(m.email).update({ isAdmin: !m.isAdmin});
   }
}
