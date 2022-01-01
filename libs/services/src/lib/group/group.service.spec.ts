import { TestBed } from '@angular/core/testing';
import { GroupService } from './group.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

describe('GroupService', () => {
    let service: GroupService;

    const promiseDataMock = {
        data: jest.fn().mockReturnValue({})
    };
    const groupDocumentMock = {
        ref: {
            get: jest.fn().mockImplementation(() => Promise.resolve(promiseDataMock))
        }
    };
    const groupCollectionMock = {
        doc: jest.fn().mockReturnValue(groupDocumentMock)
    };
    const angularFireStoreMock = {
        collection: jest.fn().mockReturnValue(groupCollectionMock)
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: AngularFirestore, useValue: angularFireStoreMock }
            ],
        });
        service = TestBed.inject(GroupService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call firestore get when getting group by id', () => {
        const spy = jest.spyOn(groupDocumentMock.ref, 'get');
        service.getGroupById('1');
        expect(spy).toHaveBeenCalled();
    });
});
