import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member, User } from '@api-interfaces';

/**
 * Members list item component
 */
@Component({
    selector: 'mate-team-members-list-item',
    templateUrl: './members-list-item.component.html',
    styleUrls: ['./members-list-item.component.scss']
})
export class MembersListItemComponent {
    /**
     * Member
     */
    @Input() member!: Member;
    /**
     * Authenticated user
     */
    @Input() me!: User;
    /**
     * Determines if user is admin
     */
    @Input() gAdmin!: string;
    /**
     * On delete member event
     */
    @Output() oDeleteMember: EventEmitter<Member> = new EventEmitter();
    /**
     * On toggle is admin event
     */
    @Output() oToggleIsAdmin: EventEmitter<Member> = new EventEmitter();

    /**
     * Emit on delete member event with member data
     *
     * @param member {Member} The member data to emit
     */
    onDeleteMember(member: Member): void {
        this.oDeleteMember.emit(member);
    }

    /**
     * Emit on toggle is admin event with member data
     *
     * @param member {Member} The member data to emit
     */
    onToggleIsAdmin(member: Member): void {
        this.oToggleIsAdmin.emit(member);
    }
}
