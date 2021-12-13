import { Injectable } from '@angular/core';
import { Group, Member } from '@api-interfaces';
import {
    AngularFirestore,
    AngularFirestoreCollection
} from '@angular/fire/compat/firestore';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GroupService {
    groupCollection: AngularFirestoreCollection<Group>;

    private success = false;
    private subject = new BehaviorSubject<string>('');

    constructor(public afs: AngularFirestore) {
        this.groupCollection = this.afs.collection('groups');
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
}
