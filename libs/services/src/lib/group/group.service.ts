import { Injectable } from '@angular/core';
import { Group } from '@api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  groups: Group[] = [];

  addNewGroup(g: Group){
    console.log(g);
  }
}
