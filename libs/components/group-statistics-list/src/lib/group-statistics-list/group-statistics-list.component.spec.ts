import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupStatisticsListComponent } from './group-statistics-list.component';
import { GroupStatisticsListModule } from '../group-statistics-list.module';
import { EventService } from '@services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Event, Team } from '@api-interfaces';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GroupStatisticsListComponent', () => {
    let component: GroupStatisticsListComponent;
    let fixture: ComponentFixture<GroupStatisticsListComponent>;

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
    const teamMock: Team = {
        id: 'teamID',
        name: 'Team 1',
        participants: []
    };
    const eventServiceMock = {
        getDoneEventsOfGroup: jest.fn().mockReturnValue(of([eventMock])),
        getTeamsOfEvent: jest.fn().mockReturnValue(of(teamMock)),
        setWinningTeam: jest.fn()
    };
    const modalServiceMock = {
        open: jest.fn()
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                { provide: EventService, useValue: eventServiceMock },
                { provide: NgbModal, useValue: modalServiceMock }
            ],
            imports: [GroupStatisticsListModule, BrowserAnimationsModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupStatisticsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get done events of group', () => {
        const spy = jest.spyOn(eventServiceMock, 'getDoneEventsOfGroup');
        expect(spy).toHaveBeenCalled();
        expect(component.events).toEqual([eventMock]);
    });

    it('should not set winning team if no team id', () => {
        const mockCopy = { ...teamMock };
        delete mockCopy.id;
        const spy = jest.spyOn(eventServiceMock, 'setWinningTeam');
        component.setWinningTeam(mockCopy);
        expect(spy).not.toHaveBeenCalled();
    });

    it('should set winning team', () => {
        teamMock.id = 'teamID';
        fixture.detectChanges();
        const spy = jest.spyOn(eventServiceMock, 'setWinningTeam');
        component.setWinningTeam(teamMock);
        expect(spy).toHaveBeenCalled();
    });

    it('should get teams of event', () => {
        const spy = jest.spyOn(eventServiceMock, 'getTeamsOfEvent');
        component.getTeamsOfEvent(eventMock.id);
        expect(spy).toHaveBeenCalledWith(eventMock.id);
    });

    it('should set winner', () => {
        component.winningTeam = teamMock;
        fixture.detectChanges();
        component.setWinner('1');
        expect(component.winningTeam.id).toEqual('1');
    });

    it('should call open method of modal service', () => {
        const spy = jest.spyOn(modalServiceMock, 'open');
        component.openModal('modal');
        expect(spy).toHaveBeenCalled();
    });
});
