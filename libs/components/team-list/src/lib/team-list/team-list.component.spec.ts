import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamListComponent } from './team-list.component';
import { Participant, Team } from '@api-interfaces';

describe('TeamListComponent', () => {
    let component: TeamListComponent;
    let fixture: ComponentFixture<TeamListComponent>;

    const teamMock: Team = {
        id: 'teamID',
        name: 'Team1',
        participants: []
    };
    const participantMock: Participant = {
        uid: 'participantID',
        displayName: 'Max',
        icon: 'iconCode'
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ TeamListComponent ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TeamListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit event on team delete', () => {
        jest.spyOn(component.deleteTeamEvent, 'emit');
        component.deleteTeam(teamMock);
        expect(component.deleteTeamEvent.emit).toHaveBeenCalledWith(teamMock);
    });

    it('should emit event on adding user to team', () => {
        jest.spyOn(component.addUserToTeamEvent, 'emit');
        component.addUserToTeam(teamMock);
        expect(component.addUserToTeamEvent.emit).toHaveBeenCalledWith(teamMock);
    });

    it('should emit event on removing user from team', () => {
        jest.spyOn(component.removeUserFromTeamEvent, 'emit');
        component.removeUserFromTeam(teamMock, participantMock);
        expect(component.removeUserFromTeamEvent.emit).toHaveBeenCalledWith({
            team: teamMock,
            participant: participantMock
        });
    });
});
