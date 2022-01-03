import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Participant, Team, UpdateTeamParticipantsData } from '@api-interfaces';

/**
 * Team list component
 */
@Component({
    selector: 'mate-team-team-list',
    templateUrl: './team-list.component.html',
    styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent {
    /**
     * Remove user from team event
     */
    @Output() removeUserFromTeamEvent = new EventEmitter<UpdateTeamParticipantsData>();
    /**
     * Add user to team event
     */
    @Output() addUserToTeamEvent = new EventEmitter<Team>();
    /**
     * Delete team event
     */
    @Output() deleteTeamEvent = new EventEmitter<Team>();
    /**
     * Teams of an event
     */
    @Input() teams: Team[] = [];
    /**
     * Determines if user is admin
     */
    @Input() isAdmin = false;

    /**
     * Emit delete team event with team data
     *
     * @param team {Team} The team to delete
     */
    deleteTeam(team: Team): void {
        this.deleteTeamEvent.emit(team);
    }

    /**
     * Emit add user to team event with team data
     *
     * @param team {Team} The team to add the user to
     */
    addUserToTeam(team: Team): void {
        this.addUserToTeamEvent.emit(team);
    }

    /**
     * Emit remove user from team event with data
     *
     * @param team {Team} The team to remove the user from
     * @param participant {Participant} The participant to remove
     */
    removeUserFromTeam(team: Team, participant: Participant): void {
        const data: UpdateTeamParticipantsData = {
            team: team,
            participant: participant
        }
        this.removeUserFromTeamEvent.emit(data);
    }
}
