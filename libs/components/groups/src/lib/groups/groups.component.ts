import { Component } from '@angular/core';
import { Group } from '@api-interfaces';
import { GroupService } from '@services';
import { Observable } from 'rxjs';

@Component({
    selector: 'mate-team-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss']
})
export class GroupsComponent {
    groups!: Observable<Group[]>
    constructor(public groupService: GroupService) {
        this.groups = this.groupService.groupCollection.valueChanges().pipe();
    }
}
