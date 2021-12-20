import { TestBed } from '@angular/core/testing';

import { PollService } from './poll.service';
import { GroupService } from '@services';
import { Poll } from '@api-interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

describe('PollService', () => {
    let service: PollService;
    const groupServiceMock = {
        currentGroupId: 0
    }
    const pollMock: Poll = {
        title: 'poll mock title', choices: [{ date: '02/02/2022', votes: 0 }], usersVoted: []
    }
    const pollInput: Poll[] = [
        { title: 'poll1', choices: [{ date: '01/01/2021', votes: 0 }], usersVoted: [] }
    ];
    const data = of(pollInput);
    const pollDocumentMock = {
        update: jest.fn(),
        delete: jest.fn()
    }
    const pollCollectionMock = {
        doc: jest.fn().mockReturnValue(pollDocumentMock),
        valueChanges: jest.fn().mockReturnValue(data),
        add: jest.fn()
    }
    const groupDocumentMock = {
        collection: jest.fn().mockReturnValue(pollCollectionMock)
    }
    const groupCollectionMock = {
        doc: jest.fn().mockReturnValue(groupDocumentMock),
    }
    const angularFirestoreMock = {
        collection: jest.fn().mockReturnValue(groupCollectionMock)
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: GroupService, useValue: groupServiceMock },
                { provide: AngularFirestore, useValue: angularFirestoreMock }
            ]
        });
        service = TestBed.inject(PollService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call firestore valueChanges method when getting polls', () => {
        const spy = jest.spyOn(pollCollectionMock, 'valueChanges');
        service.getPolls();
        expect(spy).toHaveBeenCalledWith({ idField: 'id' });
    });

    it('should call firestore add method when creating a poll', () => {
        const spy = jest.spyOn(pollCollectionMock, 'add');
        service.createPoll(pollMock);
        expect(spy).toHaveBeenCalled();
    });

    it('should call firestore update method when updating a poll', () => {
       const spy = jest.spyOn(pollDocumentMock, 'update');
       service.updatePoll('pollId', pollMock);
       expect(spy).toHaveBeenCalled();
    });

    it('should call firestore delete method when deleting a poll', () => {
       const spy = jest.spyOn(pollDocumentMock, 'delete');
       service.deletePoll('pollId');
       expect(spy).toHaveBeenCalled();
    });
});
