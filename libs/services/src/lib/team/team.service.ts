import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Team } from '@api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TeamService {

    constructor(
        private afs: AngularFirestore
    ) { }

    private static copyAndPrepare(team: Team): Team {
        const copy = {...team};
        delete copy.id;
        return copy;
    }

    getTeams(eventID: string): Observable<(Team & {id: string})[]> {
        return this.afs
            .collection<Event>('events')
            .doc(eventID)
            .collection<Team>('teams')
            .valueChanges({ idField: 'id' });
    }

    async createTeam(eventID: string, team: Team): Promise<void> {
        await this.afs
            .collection<Event>('events')
            .doc(eventID)
            .collection<Team>('teams')
            .add(team);
    }

    async updateTeam(eventID: string, team: Team): Promise<void> {
        await this.afs
            .collection<Event>('events')
            .doc(eventID)
            .collection<Team>('teams')
            .doc(team.id)
            .update(TeamService.copyAndPrepare(team));
    }

    async deleteTeam(eventID: string, teamID: string) {
        await this.afs
            .collection<Event>('events')
            .doc(eventID)
            .collection<Team>('teams')
            .doc(teamID)
            .delete();
    }
}
