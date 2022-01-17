import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';
import { GroupService } from '../group/group.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Event } from '@api-interfaces';
import { AuthService } from '../auth/auth.service';

describe('EventService', () => {
    let service: EventService;

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
    const groupServiceMock = {
        currentGroupId: 0
    };
    const eventDocumentMock = {
        update: jest.fn(),
        delete: jest.fn()
    };
    const eventCollectionMock = {
        doc: jest.fn().mockReturnValue(eventDocumentMock),
        add: jest.fn(),
        valueChanges: jest.fn()
    };
    const angularFirestoreMock = {
        collection: jest.fn().mockReturnValue(eventCollectionMock)
    };
    const authServiceMock = { }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: GroupService, useValue: groupServiceMock },
                { provide: AuthService, useValue: authServiceMock},
                { provide: AngularFirestore, useValue: angularFirestoreMock }
            ]
        });
        service = TestBed.inject(EventService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call firestore valueChanges method when getting active events of a group', () => {
        const spy = jest.spyOn(eventCollectionMock, 'valueChanges');
        service.getActiveEventsOfGroup();
        expect(spy).toHaveBeenCalledWith({ idField: 'id' });
    });

    it('should call valueChanges method when getting teams of a specified event', () => {
        const spy = jest.spyOn(eventCollectionMock, 'valueChanges');
        service.getTeamsOfEvent(eventMock.id);
        expect(spy).toHaveBeenCalledWith({ idField: 'id' });
    });

    it('should call firestore add method when creating an event', () => {
        const spy = jest.spyOn(eventCollectionMock, 'add');
        service.createEvent(eventMock);
        expect(spy).toHaveBeenCalled();
    });

    it('should call firestore update method when updating an event', () => {
        const spy = jest.spyOn(eventDocumentMock, 'update');
        service.updateEvent('eventID', eventMock);
        expect(spy).toHaveBeenCalled();
    });

    it('should call firestore delete method when deleting an event', () => {
        const spy = jest.spyOn(eventDocumentMock, 'delete');
        service.deleteEvent('eventID');
        expect(spy).toHaveBeenCalled();
    });
});
