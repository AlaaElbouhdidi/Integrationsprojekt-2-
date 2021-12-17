import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Group, Poll } from '@api-interfaces';
import { GroupService } from '../group/group.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PollService {

    constructor(
        private afs: AngularFirestore,
        private groupService: GroupService
    ) { }

    private static copyAndPrepare(poll: Poll): Poll {
        const copy = {...poll};
        delete copy.id;
        return copy;
    }

    getPolls(): Observable<(Poll & {id: string})[]> {
        return this.afs
            .collection<Group>('groups')
            .doc(this.groupService.currentGroupId)
            .collection<Poll>('datePolls')
            .valueChanges({ idField: 'id' });
    }

    async createPoll(poll: Poll): Promise<void> {
        await this.afs
            .collection<Group>('groups')
            .doc(this.groupService.currentGroupId)
            .collection<Poll>('datePolls')
            .add(poll);
    }

    async updatePoll(pollId: string, poll: Poll): Promise<void> {
        await this.afs
            .collection<Group>('groups')
            .doc(this.groupService.currentGroupId)
            .collection<Poll>('datePolls')
            .doc(pollId)
            .update(PollService.copyAndPrepare(poll));
    }

    async deletePoll(pollId: string): Promise<void> {
        await this.afs
            .collection<Group>('groups')
            .doc(this.groupService.currentGroupId)
            .collection<Poll>('datePolls')
            .doc(pollId)
            .delete();
    }
}
