import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import {
    Event,
    Participant,
    Team,
    UpdateTeamParticipantsData
} from '@api-interfaces';
import { AlertService, AuthService, TeamService, UserService } from '@services';
import { Subject, takeUntil } from 'rxjs';

/**
 * Team modal component
 */
@Component({
    selector: 'mate-team-team-modal',
    templateUrl: './team-modal.component.html',
    styleUrls: ['./team-modal.component.scss']
})
export class TeamModalComponent implements OnInit, OnDestroy {
    /**
     * Dismiss modal event
     */
    @Output() dismissModalEvent = new EventEmitter();
    /**
     * Event
     */
    @Input() event: Event = {} as Event;
    /**
     * Subject to unsubscribe from observables
     * @private
     */
    private destroy$ = new Subject();
    /**
     * All teams of an event
     */
    teams: Team[] = [];
    /**
     * Selected team
     */
    selectedTeam: Team = {} as Team;
    /**
     * Filtered list of participants of event
     */
    filteredParticipants: Participant[] = [];
    /**
     * Determines if teams are shown
     */
    showTeams = true;

    /**
     * Constructor of team modal component
     * @param teamService {TeamService}
     * @param alertService {AlertService}
     * @param authService {AuthService}
     * @param userService {UserService}
     */
    constructor(
        private teamService: TeamService,
        private alertService: AlertService,
        private authService: AuthService,
        private userService: UserService
    ) {}

    /**
     * Create a new team
     *
     * @param team {Team} The team to create
     */
    async createTeam(team: Team): Promise<void> {
        if (!this.event.id) {
            return;
        }
        try {
            await this.teamService.createTeam(this.event.id, team);
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }

    /**
     * Update a team
     *
     * @param data {UpdateTeamParticipantsData} The team data to update
     */
    async updateTeam(data: UpdateTeamParticipantsData): Promise<void> {
        if (!this.event.id) {
            return;
        }
        data.team.participants = data.team.participants.filter(
            (participant) => participant.uid !== data.participant.uid
        );
        try {
            await this.teamService.updateTeam(this.event.id, data.team);
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }

    /**
     * Delete a team
     *
     * @param team {Team} The team to delete
     */
    async deleteTeam(team: Team): Promise<void> {
        if (!this.event.id || !team.id) {
            return;
        }
        try {
            await this.teamService.deleteTeam(this.event.id, team.id);
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }

    /**
     * Filter out participants which are already in a team
     *
     * @returns {Participant[]} Participants which are not in a team
     */
    filterParticipantsList(): Participant[] {
        const allUsersInTeams: Participant[] = [];
        this.teams.forEach((team) =>
            allUsersInTeams.push(...team.participants)
        );
        const filteredParticipants: Participant[] = [
            ...this.event.participants
        ];
        if (allUsersInTeams.length === filteredParticipants.length) {
            return [];
        }
        for (let i = 0; i < filteredParticipants.length; i++) {
            allUsersInTeams.forEach((user) => {
                if (user.uid === filteredParticipants[i].uid) {
                    filteredParticipants.splice(i, 1);
                }
            });
        }
        return filteredParticipants;
    }

    /**
     * Add participant to a team
     *
     * @param participant {Participant} The participant to add to the team
     */
    async addParticipantToTeam(participant: Participant): Promise<void> {
        if (!this.selectedTeam.id || !this.event.id) {
            return;
        }
        const updatedTeam = this.selectedTeam;
        updatedTeam.participants.push(participant);
        try {
            await this.teamService.updateTeam(this.event.id, updatedTeam);
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
        this.showTeams = true;
    }

    /**
     * Show the filtered participants of the event
     *
     * @param team {Team} The team to select
     */
    showParticipantsList(team: Team): void {
        this.selectedTeam = team;
        this.showTeams = false;
    }

    /**
     * Get teams of event
     */
    ngOnInit(): void {
        if (!this.event.id) {
            return;
        }
        this.teamService
            .getTeams(this.event.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(async (teams) => {
                this.teams = teams;
                await this.setParticipantsDataOfTeams(teams);
                this.filteredParticipants = this.filterParticipantsList();
            });
    }

    /**
     * Set data of team participants
     *
     * @param teams {Team[]} The teams to set the participant data of
     */
    async setParticipantsDataOfTeams(teams: Team[]): Promise<void> {
        teams.forEach((team) => {
            team.participants.forEach(async (participant) => {
                try {
                    const teamParticipant = await this.userService.getUserByUid(
                        participant.uid
                    );
                    if (
                        teamParticipant.displayName &&
                        teamParticipant.photoURL
                    ) {
                        team.participants[
                            team.participants.indexOf(participant)
                        ].displayName = teamParticipant.displayName;
                        team.participants[
                            team.participants.indexOf(participant)
                        ].icon = teamParticipant.photoURL;
                    }
                } catch (e) {
                    this.alertService.addAlert({
                        type: 'error',
                        message: e.message
                    });
                }
            });
        });
    }

    /**
     * Unsubscribe from observables
     */
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
