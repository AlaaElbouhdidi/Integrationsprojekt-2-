import { Injectable } from '@angular/core';
import {combineLatest, from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Group } from '@api-interfaces';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {HttpClient} from "@angular/common/http";
import { environment } from '@env';

@Injectable({
    providedIn: 'root',
})
export class GroupService {
    private apiUrl: string;
    constructor(private http: HttpClient) {
        this.apiUrl = environment.environment.apiUrl;
    }

    deleteUserFromGroup(groupId: string, userId: string): Observable<void>{
        return this.http.get<Group>(`${this.apiUrl}/group/${groupId}`).pipe(mergeMap(x => {
           const updatedVersion: Group = {
               id: x.id,
               member: x.member.filter(y => y.uid !== userId),
               name: x.name,
               activity: x.activity,
               description: x.description
           };
           return this.http.patch<void>(`${this.apiUrl}/group/${groupId}`, updatedVersion);
        }));
    }

    /*
    updateGroup(id: string, name: string): Observable<void>{
        return from(this.afs.doc(`groups/${id}`).update({
            name: name
        }));
    }*/

    getGroupById(id: string): Observable<Group> {
        return this.http.get<Group>(`${this.apiUrl}/group/${id}`);
    }

    getGroups(): Observable<Group[]> {
        return this.http.get<Group[]>(`${this.apiUrl}/group`);
    }
}
