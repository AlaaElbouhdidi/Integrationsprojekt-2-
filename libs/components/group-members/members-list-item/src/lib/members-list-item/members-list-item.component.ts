import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member, User } from '@api-interfaces';

@Component({
    selector: 'mate-team-members-list-item',
    templateUrl: './members-list-item.component.html',
    styleUrls: ['./members-list-item.component.scss']
})
export class MembersListItemComponent {
    @Input() member!: Member;
    @Input() me!: User;
    @Input() gAdmin!: string;
    @Output() oDeleteMember: EventEmitter<Member> = new EventEmitter();
    @Output() oToggleIsAdmin: EventEmitter<Member> = new EventEmitter();
    /**
     * Determines if user is admin
     */

    constructor() // eslint-disable-next-line @typescript-eslint/no-empty-function
    {}

    onDeleteMember(member: Member) {
        this.oDeleteMember.emit(member);
    }

    /* onToggleIsAdmin(member: Member){
      this.oToggleIsAdmin.emit(member);
    } */
}
