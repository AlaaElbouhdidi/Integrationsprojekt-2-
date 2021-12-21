import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Group, Poll } from '@api-interfaces';
import { GroupService } from '../group/group.service';
import { Observable } from 'rxjs';

/**
 * Poll service
 */
@Injectable({
    providedIn: 'root'
})
export class PollService {

    /**
     * Constructor of poll service
     * @param afs {AngularFirestore}
     * @param groupService {GroupService}
     */
    constructor(
        private afs: AngularFirestore,
        private groupService: GroupService
    ) { }

    /**
     * Remove id from a poll
     *
     * @param poll {Poll} Poll to prepare for saving
     * @returns {Poll} Poll without id
     * @private
     */
    private static copyAndPrepare(poll: Poll): Poll {
        const copy = {...poll};
        delete copy.id;
        return copy;
    }

    /**
     * Get the polls of a group
     *
     * @returns {Observable<Poll & {id: string}>} Observable containing the polls of a group with id attribute
     */
    getPolls(): Observable<(Poll & {id: string})[]> {
        return this.afs
            .collection<Group>('groups')
            .doc(this.groupService.currentGroupId)
            .collection<Poll>('datePolls')
            .valueChanges({ idField: 'id' });
    }

    /**
     * Create a poll
     *
     * @param poll {Poll} The poll to create
     */
    async createPoll(poll: Poll): Promise<void> {
        await this.afs
            .collection<Group>('groups')
            .doc(this.groupService.currentGroupId)
            .collection<Poll>('datePolls')
            .add(poll);
    }

    /**
     * Update a poll
     *
     * @param pollId {string} The id of the poll to update
     * @param poll {Poll} The poll data to update
     */
    async updatePoll(pollId: string, poll: Poll): Promise<void> {
        await this.afs
            .collection<Group>('groups')
            .doc(this.groupService.currentGroupId)
            .collection<Poll>('datePolls')
            .doc(pollId)
            .update(PollService.copyAndPrepare(poll));
    }

    /**
     * Delete a poll
     *
     * @param pollId {string} The id of the poll to delete
     */
    async deletePoll(pollId: string): Promise<void> {
        await this.afs
            .collection<Group>('groups')
            .doc(this.groupService.currentGroupId)
            .collection<Poll>('datePolls')
            .doc(pollId)
            .delete();
    }
}
