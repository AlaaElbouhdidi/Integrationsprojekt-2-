import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventParticipantsListComponent } from './event-participants-list.component';
import { EventParticipantsListModule } from '../event-participants-list.module';
import { Participant } from '@api-interfaces';
import { UserService } from '@services';

describe('EventParticipantsListComponent', () => {
    let component: EventParticipantsListComponent;
    let fixture: ComponentFixture<EventParticipantsListComponent>;

    const participantMock: Participant = {
        uid: 'participantID',
        displayName: 'Max',
        icon: 'iconCode'
    };
    const userServiceMock = {
        getUserByUid: jest.fn()
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EventParticipantsListModule],
            providers: [{ provide: UserService, useValue: userServiceMock }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EventParticipantsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit event on adding participant to team', () => {
        jest.spyOn(component.addToTeamEvent, 'emit');
        component.addToTeam(participantMock);
        expect(component.addToTeamEvent.emit).toHaveBeenCalledWith(
            participantMock
        );
    });

    it('should filter list', () => {
        component.searchInput = 'Max';
        component.participants = [participantMock];
        fixture.detectChanges();
        component.filterList();
        expect(component.filteredParticipants).toEqual(component.participants);
    });

    it('should filter out names not matching the search input', () => {
        component.searchInput = 'Thomas';
        component.participants = [participantMock];
        fixture.detectChanges();
        component.filterList();
        expect(component.filteredParticipants).not.toEqual(
            component.participants
        );
    });

    it('should set filtered participants on component init', () => {
        component.participants = [participantMock];
        fixture.detectChanges();
        component.ngOnInit();
        expect(component.filteredParticipants).toEqual(component.participants);
    });
});
