import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Participant, Team, UpdateTeamParticipantsData } from '@api-interfaces';

@Component({
    selector: 'mate-team-team-list',
    templateUrl: './team-list.component.html',
    styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent {
    @Output() removeUserFromTeamEvent = new EventEmitter<UpdateTeamParticipantsData>();
    @Output() deleteTeamEvent = new EventEmitter<Team>();
    @Input() teams: Team[] = [];
    @Input() isAdmin = false;

    deleteTeam(team: Team): void {
        this.deleteTeamEvent.emit(team);
    }

    removeUserFromTeam(team: Team, participant: Participant): void {
        const data: UpdateTeamParticipantsData = {
            team: team,
            participant: participant
        }
        this.removeUserFromTeamEvent.emit(data);
    }
}
