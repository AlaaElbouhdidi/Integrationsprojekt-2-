import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Poll } from '@api-interfaces';
import { GroupService } from '@services';

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

    getPolls() {
        return this.afs
            .collection('groups')
            .doc(this.groupService.currentGroupId)
            .collection('datePolls')
            .valueChanges({ idField: 'id' });
    }

    async createPoll(poll: Poll): Promise<void> {
        await this.afs
            .collection('groups')
            .doc(this.groupService.currentGroupId)
            .collection('datePolls')
            .add(poll);
    }

    async updatePoll(pollId: string, poll: Poll): Promise<void> {
        await this.afs
            .collection('groups')
            .doc(this.groupService.currentGroupId)
            .collection('datePolls')
            .doc(pollId)
            .update(PollService.copyAndPrepare(poll));
    }

    async deletePoll(pollId: string): Promise<void> {
        await this.afs
            .collection('groups')
            .doc(this.groupService.currentGroupId)
            .collection('datePolls')
            .doc(pollId)
            .delete();
    }
}
