import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupEventItemComponent } from './group-event-item.component';
import { AuthService } from '@services';
import { Event } from '@api-interfaces';
import { GroupEventItemModule } from '../group-event-item.module';
import { SimpleChanges } from '@angular/core';

describe('GroupEventItemComponent', () => {
    let component: GroupEventItemComponent;
    let fixture: ComponentFixture<GroupEventItemComponent>;

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
    const authServiceMock = {
        getCurrentUser: jest.fn().mockReturnValue({ uid: 'userID' })
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                { provide: AuthService, useValue: authServiceMock }
            ],
            imports: [GroupEventItemModule]
    })
    .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupEventItemComponent);
        component = fixture.componentInstance;
        component.event = eventMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return false on participant check if user is not participating the event', () => {
        const spy = jest.spyOn(component, 'checkIfParticipant');
        component.checkIfParticipant();
        expect(spy).toReturnWith(false);
    });

    it('should return true on participant check if user participates the event', () => {
        component.event.participants[0].uid = 'userID';
        fixture.detectChanges();
        const spy = jest.spyOn(component, 'checkIfParticipant');
        component.checkIfParticipant();
        expect(spy).toReturnWith(true);
    });

    it('should emit description event', () => {
        jest.spyOn(component.descriptionEvent, 'emit');
        component.showDescription();
        expect(component.descriptionEvent.emit).toHaveBeenCalled();
    });

    it('should emit delete event', () => {
        jest.spyOn(component.deleteEvent, 'emit');
        component.delete();
        expect(component.deleteEvent.emit).toHaveBeenCalled();
    });

    it('should return from participate method if user already participates', () => {
        component.event.participants[0].uid = 'userID';
        fixture.detectChanges();
        const spy = jest.spyOn(component.participateEvent, 'emit');
        component.participate();
        expect(spy).not.toHaveBeenCalled();
    });

    it('should emit participate event', () => {
        component.event.participants[0].uid = 'participant1ID';
        fixture.detectChanges();
        const spy = jest.spyOn(component.participateEvent, 'emit');
        component.participate();
        expect(spy).toHaveBeenCalled();
    });

    it('should check if user participates the event on component change if event is provided', () => {
        const changesMock: SimpleChanges = {
            event: {
                previousValue: '',
                currentValue: '',
                firstChange: true,
                isFirstChange(): boolean {
                    return true
                }
            },
        };
        const spy = jest.spyOn(component, 'checkIfParticipant');
        component.ngOnChanges(changesMock);
        expect(spy).toHaveBeenCalled();
    });
});
