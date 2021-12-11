import { Injectable } from '@angular/core';
import { Group, Member } from '@api-interfaces';
import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GroupService {
    groupCollection: AngularFirestoreCollection<Group>;

    private success = false;
    private subject = new Subject<boolean>();

    constructor(public afs: AngularFirestore) {
        this.groupCollection = this.afs.collection('group');
    }

    toggleSuccess(success: boolean): void {
        this.success = success;
        this.subject.next(this.success);
    }
    onToggle(): Observable<boolean> {
        return this.subject.asObservable();
    }
    getGroups() {
        return this.groupCollection.valueChanges()
    }

    async addNewGroup(g: Group, m: Member) {
        const ref = await this.groupCollection.add(g);
        this.groupCollection
            .doc(ref.id)
            .collection('members')
            .doc(ref.id)
            .set(m);
    }
}
