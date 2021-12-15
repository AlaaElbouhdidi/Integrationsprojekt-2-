import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GroupService {
    currentGroupId: undefined | string = undefined;
}
