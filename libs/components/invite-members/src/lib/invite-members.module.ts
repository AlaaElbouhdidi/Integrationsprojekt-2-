import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InviteMembersComponent } from './invite-members/invite-members.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    imports: [CommonModule, MatChipsModule, MatFormFieldModule, MatIconModule],
    declarations: [
      InviteMembersComponent
    ],
    exports: [
      InviteMembersComponent
    ]
})
export class InviteMembersModule {}
