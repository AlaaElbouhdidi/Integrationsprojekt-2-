import { TestBed } from '@angular/core/testing';

import { TeamService } from './team.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Team } from '@api-interfaces';

describe('TeamService', () => {
    let service: TeamService;

    const teamMock: Team = {
        id: 'teamID',
        name: 'Team 1',
        participants: []
    }
    const teamDocumentMock = {
        update: jest.fn(),
        delete: jest.fn()
    }
    const teamCollectionMock = {
        doc: jest.fn().mockReturnValue(teamDocumentMock),
        valueChanges: jest.fn(),
        add: jest.fn()
    }
    const eventDocumentMock = {
        collection: jest.fn().mockReturnValue(teamCollectionMock)
    }
    const eventCollectionMock = {
        doc: jest.fn().mockReturnValue(eventDocumentMock)
    }
    const angularFirestoreMock = {
        collection: jest.fn().mockReturnValue(eventCollectionMock)
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: AngularFirestore, useValue: angularFirestoreMock }
            ]
        });
        service = TestBed.inject(TeamService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call firestore valueChanges method when getting teams', () => {
        const spy = jest.spyOn(teamCollectionMock, 'valueChanges');
        service.getTeams('eventID');
        expect(spy).toHaveBeenCalledWith({ idField: 'id' });
    });

    it('should call firestore add method when creating a team', () => {
        const spy = jest.spyOn(teamCollectionMock, 'add');
        service.createTeam('eventID', teamMock);
        expect(spy).toHaveBeenCalled();
    });

    it('should call firestore update method when updating a team', () => {
        const spy = jest.spyOn(teamDocumentMock, 'update');
        service.updateTeam('eventID', teamMock);
        expect(spy).toHaveBeenCalled();
    });

    it('should call firestore delete method when deleting a team', () => {
        const spy = jest.spyOn(teamDocumentMock, 'delete');
        service.deleteTeam('eventID', 'teamID');
        expect(spy).toHaveBeenCalled();
    });
});
