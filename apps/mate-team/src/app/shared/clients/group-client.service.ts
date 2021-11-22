import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {GroupModel} from "../models/GroupModel";
import {MockData} from "./mock-data";

@Injectable({
  providedIn: 'root'
})
export class GroupClientService {
    url = 'https://localhost:3001/groups';

  constructor(private httpClient: HttpClient) { }

    getGroups(): Observable<GroupModel[]>{
      //return this.httpClient.get<GroupModel[]>(this.url);
        return of(MockData.groups);
    }
}
