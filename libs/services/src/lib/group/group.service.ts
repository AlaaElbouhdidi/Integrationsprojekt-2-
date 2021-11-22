import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Group } from '@api-interfaces';
import { groups } from './mock-groups';

@Injectable({
    providedIn: 'root',
})
export class GroupService {
    getGroups(): Observable<Group[]> {
        //return this.httpClient.get<GroupModel[]>(this.url);
        return of(groups);
    }
}
