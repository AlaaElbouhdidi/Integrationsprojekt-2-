import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MembersListItemComponent } from './members-list-item/members-list-item.component';

export const membersListItemRoutes: Route[] = [];

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [
      MembersListItemComponent
    ],
    exports: [
      MembersListItemComponent
    ]
})
export class MembersListItemModule {}
