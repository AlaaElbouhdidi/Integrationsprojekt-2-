import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPollsEventsComponent } from './group-polls-events.component';
import {
    AlertService,
    AuthService,
    EventService,
    GroupService,
    PollService,
    TeamService
} from '@services';
import { GroupPollsEventsModule } from '../group-polls-events.module';
import { Event, Poll } from '@api-interfaces';

describe('GroupPollsEventsComponent', () => {
    let component: GroupPollsEventsComponent;
    let fixture: ComponentFixture<GroupPollsEventsComponent>;

    const teamServiceMock = {
        getTeamsSync: jest.fn()
    };
    const pollServiceMock = {
        getPolls: jest.fn(),
        createPoll: jest.fn(),
        updatePoll: jest.fn(),
        deletePoll: jest.fn()
    };
    const eventServiceMock = {
        getActiveEventsOfGroup: jest.fn(),
        createEvent: jest.fn(),
        updateEvent: jest.fn()
    };
    const authServiceMock = {
        getCurrentUser: jest.fn().mockReturnValue({ uid: 'userId' })
    };
    const groupServiceMock = {
        getGroupById: jest.fn()
    };
    const alertServiceMock = {
        addAlert: jest.fn()
    };
    const pollMock: Poll = {
        id: 'pollId',
        title: 'poll',
        choices: [{ date: '01/01/2021', votes: 2 }],
        usersVoted: []
    };
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

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                { provide: PollService, useValue: pollServiceMock },
                { provide: AuthService, useValue: authServiceMock },
                { provide: GroupService, useValue: groupServiceMock },
                { provide: AlertService, useValue: alertServiceMock },
                { provide: EventService, useValue: eventServiceMock },
                { provide: TeamService, useValue: teamServiceMock }
            ],
            imports: [GroupPollsEventsModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupPollsEventsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render info message if no poll active', () => {
        const message = fixture.debugElement.nativeElement.querySelector(
            '.polls-body-message'
        );
        expect(component.polls.length).toEqual(0);
        expect(message).not.toBeNull();
    });

    it('should render info message if no events in group', () => {
        const message = fixture.debugElement.nativeElement.querySelector(
            '.events-body-message'
        );
        expect(component.events.length).toEqual(0);
        expect(message).not.toBeNull();
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

    it('should create poll', () => {
        const spy = jest.spyOn(pollServiceMock, 'createPoll');
        const alertSpy = jest.spyOn(alertServiceMock, 'addAlert');
        component.createPoll(pollMock);
        expect(spy).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalled();
    });

    it('should not update poll if user has already voted', () => {
        const pollMockWithUserVote = {
            title: 'poll',
            choices: [{ date: '01/01/2021', votes: 2 }],
            usersVoted: ['userId']
        };
        const spy = jest.spyOn(pollServiceMock, 'updatePoll');
        component.updatePoll(pollMockWithUserVote);
        expect(spy).not.toHaveBeenCalled();
    });

    it('should update poll if user has not voted yet', () => {
        const spy = jest.spyOn(pollServiceMock, 'updatePoll');
        const alertSpy = jest.spyOn(alertServiceMock, 'addAlert');
        component.updatePoll(pollMock);
        expect(spy).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalled();
    });

    it('should create event', () => {
        component.group.admin = 'userId';
        fixture.detectChanges();
        const spy = jest.spyOn(eventServiceMock, 'createEvent');
        component.createEvent({
            name: 'event name',
            description: 'event description',
            date: 'event date'
        });
        expect(spy).toHaveBeenCalled();
    });

    it('should not update event if no event id provided', () => {
        delete eventMock.id;
        const spy = jest.spyOn(eventServiceMock, 'updateEvent');
        component.updateEvent(eventMock, false);
        expect(spy).not.toHaveBeenCalled();
    });

    it('should update event', () => {
        const spy = jest.spyOn(eventServiceMock, 'updateEvent');
        const alertSpy = jest.spyOn(alertServiceMock, 'addAlert');
        eventMock.id = 'eventID';
        fixture.detectChanges();
        component.updateEvent(eventMock, false);
        expect(spy).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalled();
    });

    it('should set description event and open modal', () => {
        const spy = jest.spyOn(component, 'openModal');
        component.showEventDescription(eventMock, 'modalReference');
        expect(component.descriptionEvent).toEqual(eventMock);
        expect(spy).toHaveBeenCalled();
    });

    it('should get group on component init', () => {
        const spy = jest.spyOn(groupServiceMock, 'getGroupById');
        component.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    it('should get polls on component init', () => {
        const spy = jest.spyOn(pollServiceMock, 'getPolls');
        component.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    it('should trigger unsubscribe from observables on destroy', () => {
        jest.spyOn(component['destroy$'], 'next');
        jest.spyOn(component['destroy$'], 'complete');
        component.ngOnDestroy();
        expect(component['destroy$'].next).toHaveBeenCalled();
        expect(component['destroy$'].complete).toHaveBeenCalled();
    });
});
