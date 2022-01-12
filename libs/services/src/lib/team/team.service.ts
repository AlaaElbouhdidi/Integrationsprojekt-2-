import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Team } from '@api-interfaces';
import { Observable } from 'rxjs';

/**
 * Team service
 */
@Injectable({
    providedIn: 'root'
})
export class TeamService {
    /**
     * Constructor of team service
     * @param afs {AngularFirestore}
     */
    constructor(private afs: AngularFirestore) {}

    /**
     * Remove id from a team
     *
     * @param team {Team} Team to remove id from
     * @returns {Team} Team without id
     * @private
     */
    private static copyAndPrepare(team: Team): Team {
        const copy = { ...team };
        delete copy.id;
        return copy;
    }

    /**
     * Get the teams of an event
     *
     * @param eventID {string} The id of the event
     * @returns {Observable<(Team & {id: string})[]>} Observable containing the teams of an event
     */
    getTeams(eventID: string): Observable<(Team & { id: string })[]> {
        return this.afs
            .collection<Event>('events')
            .doc(eventID)
            .collection<Team>('teams')
            .valueChanges({ idField: 'id' });
    }

    /**
     * Get teams of an event
     *
     * @param eventID The id of the event
     */
    async getTeamsSync(eventID: string) {
        const snapshot = await this.afs
            .collection('events')
            .doc(eventID)
            .collection('teams')
            .ref.get();
        return snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                name: doc.get('name'),
                participants: doc.get('participants')
            };
        });
    }

    /**
     * Create a team
     *
     * @param eventID {string} The id of the event to which the team belongs
     * @param team {Team} The team to create
     */
    async createTeam(eventID: string, team: Team): Promise<void> {
        await this.afs
            .collection<Event>('events')
            .doc(eventID)
            .collection<Team>('teams')
            .add(team);
    }

    /**
     * Update a team
     *
     * @param eventID {string} The id of the event to which the team belongs
     * @param team {Team} The team data to update
     */
    async updateTeam(eventID: string, team: Team): Promise<void> {
        await this.afs
            .collection<Event>('events')
            .doc(eventID)
            .collection<Team>('teams')
            .doc(team.id)
            .update(TeamService.copyAndPrepare(team));
    }

    /**
     * Delete a tem
     *
     * @param eventID {string} The id of the event to which the team belongs
     * @param teamID {string} The id of the event to delete
     */
    async deleteTeam(eventID: string, teamID: string) {
        await this.afs
            .collection<Event>('events')
            .doc(eventID)
            .collection<Team>('teams')
            .doc(teamID)
            .delete();
    }
}
