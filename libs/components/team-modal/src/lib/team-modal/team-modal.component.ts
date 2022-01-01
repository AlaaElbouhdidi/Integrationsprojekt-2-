import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Event, Team, UpdateTeamParticipantsData } from '@api-interfaces';
import { AlertService, AuthService, TeamService } from '@services';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'mate-team-team-modal',
    templateUrl: './team-modal.component.html',
    styleUrls: ['./team-modal.component.scss']
})
export class TeamModalComponent implements OnInit, OnDestroy {
    @Output() dismissModalEvent = new EventEmitter();
    @Input() event: Event = {} as Event;
    @Input() isAdmin = false;
    @Input() groupAdmin = '';
    private destroy$ = new Subject();
    teams: Team[] = [];

    constructor(
        private teamService: TeamService,
        private alertService: AlertService,
        private authService: AuthService
    ) { }

    async createTeam(team: Team): Promise<void> {
        if (!this.event.id) {
            return;
        }
        if (!this.checkIfAdmin(this.groupAdmin)) {
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

    async updateTeam(data: UpdateTeamParticipantsData) {
        if (!this.event.id) {
            return;
        }
        if (!this.checkIfAdmin(this.groupAdmin)) {
            return;
        }
        data.team.participants = data.team.participants.filter(participant => participant.uid !== data.participant.uid);
        try {
            await this.teamService.updateTeam(this.event.id, data.team);
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
    }

    async deleteTeam(team: Team): Promise<void> {
        if (!this.event.id || !team.id) {
            return;
        }
        if (!this.checkIfAdmin(this.groupAdmin)) {
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

    checkIfAdmin(adminId: string): boolean {
        const userId = this.authService.getCurrentUser().uid;
        return userId === adminId;
    }

    ngOnInit(): void {
        if (!this.event.id) {
            return;
        }
        this.teamService
            .getTeams(this.event.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(teams => {
                this.teams = teams;
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
