import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamModalComponent } from './team-modal.component';
import { TeamModalModule } from '../team-modal.module';
import { AlertService, AuthService, TeamService } from '@services';
import { Event, Participant, Team } from '@api-interfaces';
import { of } from 'rxjs';

describe('TeamModalComponent', () => {
    let component: TeamModalComponent;
    let fixture: ComponentFixture<TeamModalComponent>;

    const eventMock: Event = {
        id: 'event1ID',
        name: 'Event name',
        description: 'Event description',
        date: '01/01/2022',
        groupID: 'group1ID',
        done: false,
        participants: [
            {
                uid: 'participant1ID',
                displayName: 'Max',
                icon: 'icon'
            }
        ]
    };
    const participantMock: Participant = {
        uid: 'participantID',
        displayName: 'Max',
        icon: ''
    };
    const teamMock: Team = {
        id: 'teamID',
        name: 'Team 1',
        participants: []
    };
    const teamServiceMock = {
        getTeams: jest.fn().mockReturnValue(of([teamMock])),
        createTeam: jest.fn(),
        updateTeam: jest.fn(),
        deleteTeam: jest.fn()
    };
    const authServiceMock = {
        getCurrentUser: jest.fn().mockReturnValue({ uid: 'userId' })
    };
    const alertServiceMock = {
        addAlert: jest.fn()
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                { provide: TeamService, useValue: teamServiceMock },
                { provide: AuthService, useValue: authServiceMock },
                { provide: AlertService, useValue: alertServiceMock }
            ],
            imports: [TeamModalModule]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TeamModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should filter participants list', () => {
        component.event = eventMock;
        component.teams = [teamMock];
        fixture.detectChanges();
        const spy = jest.spyOn(component, 'filterParticipantsList');
        component.filterParticipantsList();
        expect(spy).toReturnWith([component.event.participants[0]]);
    });

    it('should return empty array if all participants are in teams', () => {
        component.event = eventMock;
        teamMock.participants = [
            {
                uid: 'participant1ID',
                displayName: 'Max',
                icon: ''
            }
        ];
        component.teams = [teamMock];
        fixture.detectChanges();
        const spy = jest.spyOn(component, 'filterParticipantsList');
        component.filterParticipantsList();
        expect(spy).toReturnWith([]);
    });

    it('should create team', () => {
        component.event.id = 'eventId';
        component.groupAdmin = 'userId';
        fixture.detectChanges();
        const spy = jest.spyOn(teamServiceMock, 'createTeam');
        component.createTeam(teamMock);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should add participant to team', () => {
        component.selectedTeam = teamMock;
        component.event.id = 'eventId';
        component.groupAdmin = 'userId';
        fixture.detectChanges();
        const spy = jest.spyOn(teamServiceMock, 'updateTeam');
        component.addParticipantToTeam(participantMock);
        expect(spy).toHaveBeenCalledWith('eventId', teamMock);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(component.showTeams).toEqual(true);
    });

    it('should update team', () => {
        component.event.id = 'eventId';
        component.groupAdmin = 'userId';
        fixture.detectChanges();
        const spy = jest.spyOn(teamServiceMock, 'updateTeam');
        const updateTeamData = {
            team: teamMock,
            participant: participantMock
        };
        component.updateTeam(updateTeamData);
        expect(spy).toHaveBeenCalled();
    });

    it('should delete team', () => {
        component.event.id = 'eventId';
        component.groupAdmin = 'userId';
        fixture.detectChanges();
        const spy = jest.spyOn(teamServiceMock, 'deleteTeam');
        component.deleteTeam(teamMock);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should show participants list', () => {
        component.showParticipantsList(teamMock);
        expect(component.selectedTeam).toBe(teamMock);
        expect(component.showTeams).toEqual(false);
    });

    it('should return false on admin check if user is not admin', () => {
        const spy = jest.spyOn(component, 'checkIfAdmin');
        component.checkIfAdmin('adminId');
        expect(spy).toReturnWith(false);
    });

    it('should return true on admin check if user is admin', () => {
        const spy = jest.spyOn(component, 'checkIfAdmin');
        component.checkIfAdmin('userId');
        expect(spy).toReturnWith(true);
    });

    it('should get teams on component init and filter participants list', () => {
        component.event = eventMock;
        component.teams = [teamMock];
        fixture.detectChanges();
        const spy = jest.spyOn(teamServiceMock, 'getTeams');
        const filterSpy = jest.spyOn(component, 'filterParticipantsList');
        component.ngOnInit();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(filterSpy).toHaveBeenCalled();
    });

    it('should trigger unsubscribe from observables on destroy', () => {
        jest.spyOn(component['destroy$'], 'next');
        jest.spyOn(component['destroy$'], 'complete');
        component.ngOnDestroy();
        expect(component['destroy$'].next).toHaveBeenCalled();
        expect(component['destroy$'].complete).toHaveBeenCalled();
    });
});
