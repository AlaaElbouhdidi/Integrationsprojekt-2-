import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MembersListItemComponent } from './members-list-item/members-list-item.component';
import { UserIconModule } from '@user-icon';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faUserCog, faUserTie, faUserTimes } from '@fortawesome/free-solid-svg-icons';

export const membersListItemRoutes: Route[] = [];

@NgModule({
    imports: [CommonModule, RouterModule, FontAwesomeModule, UserIconModule],
    declarations: [
      MembersListItemComponent
    ],
    exports: [
      MembersListItemComponent
    ]
})
export class MembersListItemModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faUser,
      faUserCog,
      faUserTie,
      faUserTimes,
    );
  }
}
