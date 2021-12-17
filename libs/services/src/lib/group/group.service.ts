import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Group } from '@api-interfaces';

@Injectable({
    providedIn: 'root'
})
export class GroupService {
    currentGroupId = '';

    constructor(
        private afs: AngularFirestore
    ) {}

    getGroupById(groupId: string): Promise<Group | undefined> {
        return this.afs
            .collection<Group>('groups')
            .doc(groupId)
            .ref
            .get()
            .then(group => group.data());
    }
}
