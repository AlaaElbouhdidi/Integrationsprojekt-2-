import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '@api-interfaces';

@Component({
  selector: 'mate-team-members-list-item',
  templateUrl: './members-list-item.component.html',
  styleUrls: ['./members-list-item.component.scss']
})
export class MembersListItemComponent  {
  @Input() member!: Member;
  @Output() oDeleteMember: EventEmitter<Member> = new EventEmitter();
  @Output() oToggleIsAdmin: EventEmitter<Member> = new EventEmitter();

  constructor(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) {}

    onDeleteMember(member: Member){
      this.oDeleteMember.emit(member);
    }
    
    onToggleIsAdmin(member: Member){
      this.oToggleIsAdmin.emit(member);
    }
}
