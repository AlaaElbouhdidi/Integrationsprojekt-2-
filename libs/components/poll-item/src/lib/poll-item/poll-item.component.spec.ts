import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollItemComponent } from './poll-item.component';
import { AlertService, AuthService } from '@services';
import { PollItemModule } from '../poll-item.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Poll } from '@api-interfaces';

describe('PollItemComponent', () => {
    let component: PollItemComponent;
    let fixture: ComponentFixture<PollItemComponent>;

    const pollMock: Poll = {
        title: 'poll', choices: [{ date: '01/01/2021', votes: 2 }], usersVoted: []
    };
    const userMock = {
        uid: 'user1Id'
    };
    const authServiceMock = {
        getCurrentUser: jest.fn().mockReturnValue(userMock)
    };
    const alertServiceMock = {
        addAlert: jest.fn()
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                { provide: AuthService, useValue: authServiceMock },
                { provide: AlertService, useValue: alertServiceMock }
            ],
            imports: [
                BrowserAnimationsModule,
                PollItemModule
            ]
    })
    .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PollItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should hide form when results are shown', () => {
        component.showResults = false;
        component.flipPollItem();
        fixture.detectChanges();
        const form = fixture.debugElement.nativeElement.querySelector('form');
        expect(form).toBeNull();
    });

    it('should hide choice buttons when results are shown', () => {
        component.showResults = false;
        component.flipPollItem();
        fixture.detectChanges();
        const buttonWrapper = fixture.debugElement.nativeElement.querySelector('.poll-item-footer-choices-btn-wrapper');
        expect(buttonWrapper).toBeNull();
    });

    it('should calculate vote percentage', () => {
        component.poll.choices = [
            { date: '01/01/2021', votes: 2 },
            { date: '02/01/2021', votes: 1 },
            { date: '03/01/2021', votes: 2 },
            { date: '04/01/2021', votes: 5 },
            { date: '05/01/2021', votes: 0 },
        ];
        expect(component.calcBarWidth(0)).toEqual(0);
        expect(component.calcBarWidth(2)).toEqual(20);
        expect(component.calcBarWidth(5)).toEqual(50);
        expect(component.calcBarWidth(10)).toEqual(100);
    });

    it('should return false from user vote check if no choices provided', () => {
        component.poll = {
            title: 'poll',
            choices: [],
            usersVoted: []
        };
        fixture.detectChanges();
        expect(component.poll.choices.length).toBe(0);
        const spy = jest.spyOn(component, 'checkIfUserVoted');
        component.checkIfUserVoted(pollMock);
        expect(spy).toReturnWith(false);
    });

    it('should return false from user vote check if user did not vote yet', () => {
        component.poll = pollMock;
        fixture.detectChanges();
        const spy = jest.spyOn(component, 'checkIfUserVoted');
        component.checkIfUserVoted(pollMock);
        expect(spy).toReturnWith(false);
    });

    it('should return true from user vote check if user already voted', () => {
        const pollMockWithUserVote = {
            title: 'poll',
            choices: [{ date: '01/01/2021', votes: 2 }],
            usersVoted: ['user1Id']
        };
        component.poll = pollMockWithUserVote;
        fixture.detectChanges();
        const spy = jest.spyOn(component, 'checkIfUserVoted');
        component.checkIfUserVoted(pollMockWithUserVote);
        expect(spy).toReturnWith(true);
    });

    it('should emit event on poll delete', () => {
        jest.spyOn(component.deletePollEvent, 'emit');
        component.deletePoll();
        expect(component.deletePollEvent.emit).toHaveBeenCalled();
    });

    it('should show error alert if no input is checked on vote', () => {
        const spy = jest.spyOn(alertServiceMock, 'addAlert');
        component.vote();
        expect(spy).toHaveBeenCalled();
    });

    it('should increase votes of poll on vote', () => {
        component.poll = pollMock;
        fixture.detectChanges();
        const input = fixture.debugElement.nativeElement.querySelector('input[name=choice]');
        input.checked = true;
        expect(component.poll.choices[input.value].votes).toEqual(2);
        component.vote();
        expect(component.poll.choices[input.value].votes).toEqual(3);
    });

    it('should emit vote event with poll on vote', () => {
        component.poll = pollMock;
        fixture.detectChanges();
        const input = fixture.debugElement.nativeElement.querySelector('input[name=choice]');
        input.checked = true;
        const spy = jest.spyOn(component.voteEvent, 'emit');
        component.vote();
        expect(spy).toHaveBeenCalledWith(pollMock);
    });

    it('should check if user voted on ngOnChange', () => {
        const spy = jest.spyOn(component, 'checkIfUserVoted');
        component.poll = pollMock;
        fixture.detectChanges();
        component.ngOnChanges();
        expect(spy).toHaveBeenCalled();
    });
});
