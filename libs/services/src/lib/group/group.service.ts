import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Group } from '@api-interfaces';

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

    /**
     * Constructor of group service
     * @param afs {AngularFirestore}
     */
    constructor(
        private afs: AngularFirestore
    ) {}

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
}
